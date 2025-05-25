import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4 py-8">
      {/* Profile Header Section */}
      <section className="rounded-4xl border border-black bg-white p-8 mb-8 shadow-md">
        <div className="flex justify-between gap-8 max-sm:flex-col items-center">
          <div className="flex gap-6 items-center">
            <div className="relative">
              <Image
                src={user.imageUrl}
                alt={user.firstName!}
                width={130}
                height={130}
                className="rounded-full border-4 border-primary shadow-lg"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-3xl">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                {/* Using search icon instead of email since email.svg doesn't exist */}
                <Image
                  src="/icons/search.svg"
                  alt="email"
                  width={16}
                  height={16}
                  className="opacity-70"
                />
                {user.emailAddresses[0].emailAddress}
              </p>
              <div className="mt-2 flex gap-2">
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  Member
                </span>
                <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-4 max-sm:mt-6 max-sm:w-full max-sm:justify-center">
            <div className="rounded-4xl border border-black bg-white p-5 gap-3 flex flex-col h-fit shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary">
              <div className="flex gap-3 items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Image
                    src="/icons/check.svg"
                    alt="checkmark"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-3xl font-bold">{sessionHistory.length}</p>
              </div>
              <div className="text-sm font-medium">Lessons completed</div>
            </div>

            <div className="rounded-4xl border border-black bg-white p-5 gap-3 flex flex-col h-fit shadow-md hover:shadow-lg transition-all duration-300 hover:border-primary">
              <div className="flex gap-3 items-center">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Image
                    src="/icons/cap.svg"
                    alt="cap"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="text-3xl font-bold">{companions.length}</p>
              </div>
              <div className="text-sm font-medium">Companions created</div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordion Sections */}
      <div className="rounded-4xl border border-black bg-white p-6 shadow-md">
        <Accordion type="multiple" className="space-y-4">
          <AccordionItem
            value="bookmarks"
            className="border-b border-gray-200 pb-2"
          >
            <AccordionTrigger className="text-2xl font-bold py-4 hover:bg-primary/5 px-4 rounded-lg transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Image
                    src="/icons/bookmark.svg"
                    alt="bookmark"
                    width={20}
                    height={20}
                  />
                </div>
                Bookmarked Companions
                <span className="ml-2 text-sm bg-black text-white rounded-full px-3 py-1">
                  {bookmarkedCompanions.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <CompanionsList
                companions={bookmarkedCompanions}
                title="Bookmarked Companions"
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem
            value="recent"
            className="border-b border-gray-200 pb-2"
          >
            <AccordionTrigger className="text-2xl font-bold py-4 hover:bg-primary/5 px-4 rounded-lg transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <Image
                    src="/icons/clock.svg"
                    alt="recent"
                    width={20}
                    height={20}
                  />
                </div>
                Recent Sessions
                <span className="ml-2 text-sm bg-black text-white rounded-full px-3 py-1">
                  {sessionHistory.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <CompanionsList
                title="Recent Sessions"
                companions={sessionHistory}
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="companions" className="border-b-0 pb-2">
            <AccordionTrigger className="text-2xl font-bold py-4 hover:bg-primary/5 px-4 rounded-lg transition-all">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  {/* Using cap icon instead of users since users.svg doesn't exist */}
                  <Image
                    src="/icons/cap.svg"
                    alt="companions"
                    width={20}
                    height={20}
                  />
                </div>
                My Companions
                <span className="ml-2 text-sm bg-black text-white rounded-full px-3 py-1">
                  {companions.length}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pt-4">
              <CompanionsList title="My Companions" companions={companions} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
};
export default Profile;
