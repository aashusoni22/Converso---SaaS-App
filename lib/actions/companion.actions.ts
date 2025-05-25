"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data)
    throw new Error(error?.message || "Failed to create a companion");

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;

  if (error) throw new Error(error.message);

  // If user is logged in, check which companions are bookmarked
  if (userId) {
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from("bookmarks")
      .select("companion_id")
      .eq("user_id", userId);

    if (bookmarksError) throw new Error(bookmarksError.message);

    // Create a set of bookmarked companion IDs for faster lookup
    const bookmarkedIds = new Set(bookmarks.map((b) => b.companion_id));

    // Add bookmarked property to each companion
    return companions.map((companion) => ({
      ...companion,
      bookmarked: bookmarkedIds.has(companion.id),
    }));
  }

  // If user is not logged in, no companions are bookmarked
  return companions.map((companion) => ({
    ...companion,
    bookmarked: false,
  }));
};

export const getCompanion = async (id: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  if (!data || data.length === 0) return null;

  // If user is logged in, check if this companion is bookmarked
  if (userId) {
    const { data: bookmark, error: bookmarkError } = await supabase
      .from("bookmarks")
      .select()
      .eq("companion_id", id)
      .eq("user_id", userId)
      .maybeSingle();

    if (bookmarkError) console.log(bookmarkError);

    return {
      ...data[0],
      bookmarked: !!bookmark,
    };
  }

  // If user is not logged in, companion is not bookmarked
  return {
    ...data[0],
    bookmarked: false,
  };
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  const { data: existingSession, error: checkError } = await supabase
    .from("session_history")
    .select()
    .eq("user_id", userId)
    .eq("companion_id", companionId)
    .maybeSingle();

  if (checkError) throw new Error(checkError.message);

  if (existingSession) {
    const { error: updateError } = await supabase
      .from("session_history")
      .update({ created_at: new Date().toISOString() })
      .eq("id", existingSession.id);

    if (updateError) throw new Error(updateError.message);

    return existingSession;
  }

  const { data, error } = await supabase.from("session_history").insert({
    companion_id: companionId,
    user_id: userId,
  });

  if (error) throw new Error(error.message);

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  const companions = data.map(({ companions }) => companions);

  if (userId) {
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from("bookmarks")
      .select("companion_id")
      .eq("user_id", userId);

    if (bookmarksError) throw new Error(bookmarksError.message);

    const bookmarkedIds = new Set(bookmarks.map((b) => b.companion_id));

    return companions.map((companion) => ({
      ...companion,
      bookmarked: bookmarkedIds.has(companion.id),
    }));
  }

  return companions.map((companion) => ({
    ...companion,
    bookmarked: false,
  }));
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const { userId: currentUserId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);

  const companions = data.map(({ companions }) => companions);

  if (currentUserId) {
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from("bookmarks")
      .select("companion_id")
      .eq("user_id", currentUserId);

    if (bookmarksError) throw new Error(bookmarksError.message);

    const bookmarkedIds = new Set(bookmarks.map((b) => b.companion_id));

    return companions.map((companion) => ({
      ...companion,
      bookmarked: bookmarkedIds.has(companion.id),
    }));
  }

  return companions.map((companion) => ({
    ...companion,
    bookmarked: false,
  }));
};

export const getUserCompanions = async (userId: string) => {
  const { userId: currentUserId } = await auth();
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("author", userId);

  if (error) throw new Error(error.message);

  if (currentUserId) {
    const { data: bookmarks, error: bookmarksError } = await supabase
      .from("bookmarks")
      .select("companion_id")
      .eq("user_id", currentUserId);

    if (bookmarksError) throw new Error(bookmarksError.message);

    const bookmarkedIds = new Set(bookmarks.map((b) => b.companion_id));

    return data.map((companion) => ({
      ...companion,
      bookmarked: bookmarkedIds.has(companion.id),
    }));
  }

  return data.map((companion) => ({
    ...companion,
    bookmarked: false,
  }));
};

export const newCompanionPermissions = async () => {
  const { userId, has } = await auth();
  const supabase = createSupabaseClient();

  let limit = 0;

  if (has({ plan: "pro" })) {
    return true;
  } else if (has({ feature: "3_companion_limit" })) {
    limit = 3;
  } else if (has({ feature: "10_companion_limit" })) {
    limit = 10;
  }

  const { data, error } = await supabase
    .from("companions")
    .select("id", { count: "exact" })
    .eq("author", userId);

  if (error) throw new Error(error.message);

  const companionCount = data?.length;

  if (companionCount >= limit) {
    return false;
  } else {
    return true;
  }
};

// Bookmarks
export const addBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();

  // First check if the bookmark already exists
  const { data: existingBookmark, error: checkError } = await supabase
    .from("bookmarks")
    .select()
    .eq("companion_id", companionId)
    .eq("user_id", userId)
    .maybeSingle();

  if (checkError) {
    throw new Error(checkError.message);
  }

  if (!existingBookmark) {
    const { data, error } = await supabase.from("bookmarks").insert({
      companion_id: companionId,
      user_id: userId,
    });

    if (error) {
      throw new Error(error.message);
    }

    revalidatePath(path);
    return data;
  }

  revalidatePath(path);
  return existingBookmark;
};

export const removeBookmark = async (companionId: string, path: string) => {
  const { userId } = await auth();
  if (!userId) return;
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("companion_id", companionId)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  revalidatePath(path);
  return data;
};

export const getBookmarkedCompanions = async (userId: string) => {
  const supabase = createSupabaseClient();
  const { data, error } = await supabase
    .from("bookmarks")
    .select(`companions:companion_id (*)`)
    .eq("user_id", userId);
  if (error) {
    throw new Error(error.message);
  }
  return data.map(({ companions }) => ({
    ...companions,
    bookmarked: true,
  }));
};
