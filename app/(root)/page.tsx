import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import EventCalendar from "@/components/shared/EventCalendar";
import Search from "@/components/shared/Search";
import TestimonialsNew from "@/components/shared/TestimonialsNew";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import FloatingObject from "@/components/shared/FloatingObject"; // ✅ Import Floating Object

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 6,
  });

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 py-10 md:py-20 text-white font-sans shadow-xl">
        
        <FloatingObject /> {/* ✅ Floating Object added */}

        <div className="wrapper grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-6 text-white">
            <h1 className="text-5xl font-extrabold leading-tight">
              Plan, Connect, <br /> Experience:{" "}
              <span className="text-yellow-400">
                Where Every Event Comes to Life!
              </span>
            </h1>
            <p className="text-lg opacity-90">
              Your Ultimate Event Experience Awaits 🚀
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                asChild
                className="bg-yellow-400 text-black hover:bg-yellow-500"
              >
                <Link href="#events">Explore Now</Link>
              </Button>
              <Button size="lg" asChild variant="outline">
                <Link href="/events/create">Host an Event</Link>
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center">
            <Image
              src="/assets/images/hero.png"
              alt="hero"
              width={500}
              height={500}
              className="max-h-[75vh] object-contain"
            />
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="wrapper my-12 space-y-12">
        <h2 className="text-4xl font-bold text-center">
          Event organizers?
          <br />
          They're all vibing with this ✨
        </h2>

        {/* Filters */}
        <div className="flex flex-col gap-6 md:flex-row justify-center">
          <Search />
          <CategoryFilter />
        </div>

        {/* Events Collection */}
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
      
      {/* Testimonials Section */}
      <TestimonialsNew />
      
      {/* Event Calendar Section */}
      <section className="wrapper my-12">
        <EventCalendar />
      </section>
    </>
  );
}
