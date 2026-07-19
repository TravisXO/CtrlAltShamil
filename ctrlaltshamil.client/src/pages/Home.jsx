import HeroSection from "../components/home/HeroSection";
import WhatIDo from "../components/home/WhatIDo";
import TechStack from "../components/home/TechStack";
import FeaturedProjects from "../components/home/FeaturedProjects";
import SubscriptionTeaser from "../components/home/SubscriptionTeaser";
import BlogPostSection from "../components/home/BlogPostSection";

export default function Home() {
    return (
        <main id="main-content">
            <HeroSection />
            <WhatIDo />
            <TechStack />
            <FeaturedProjects />
            <SubscriptionTeaser />
            <BlogPostSection />
        </main>
    );
}