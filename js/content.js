// Content Data Structure
const siteContent = {
    journey: [
        {
            icon: "book-open",
            title: "Learn",
            description: "Begin with foundational knowledge and practical skills tailored to your goals"
        },
        {
            icon: "trending-up",
            title: "Grow",
            description: "Apply your learning through hands-on experience and real-world challenges"
        },
        {
            icon: "award",
            title: "Lead",
            description: "Transform into a leader who drives change and inspires others"
        }
    ],
    programs: [
        {
            id: "nco",
            logo: "images/ncoLogo.png",
            title: "National Cyber Olympiad",
            description: "Empowering students with ICT skills through competitive learning",
            link: "https://nco.prashikshan.edu.np"
        },
        {
            id: "branding",
            logo: "images/playbook.png",
            title: "The Branding Playbook (Pokhara)",
            description: "Master the art and science of brand building with industry experts",
            link: "branding-playbook-pok/"
        },
        
        {
            id: "isprout",
            logo: "images/isproutLogo.png",
            title: "iSprout",
            description: "National seed-fund challenge for students",
            link: "https://isprout.prashikshan.edu.np"
        },
        {
            id: "branding",
            logo: "images/playbook.png",
            title: "The Branding Playbook (Kathmandu)",
            description: "Master the art and science of brand building with industry experts",
            link: "branding-playbook/"
        },
        // {
        //     id: "mba",
        //     logo: "https://placehold.co/600x400/269613/ffffff?text=Corporate+Training",
        //     title: "Pro MBA",
        //     description: "Professional MBA for working professionals",
        //     link: "#mba"
        // },
        {
            id: "conclave",
            logo: "images/ccLogo.png",
            title: "Career Conclave",
            description: "Nepal's premier platform for career development",
            link: "https://www.careerconclave.com"
        },
        {
            id: "techno",
            logo: "images/technoLogo.png",
            title: "Technopreneurs Connect",
            description: "Bridging innovation with entrepreneurship",
            link: "#techno"
        }
    ],
    impact: [
        {
            icon: "calendar",
            number: "8+",
            label: "Years of Excellence"
        },
        {
            icon: "users",
            number: "20K+",
            label: "Lives Transformed"
        },
        {
            icon: "briefcase",
            number: "50+",
            label: "Partner Organizations"
        },
        {
            icon: "target",
            number: "20+",
            label: "Programs Delivered"
        }
    ]
};

// Export for potential API integration
window.prashikshanSite = window.prashikshanSite || {};
window.prashikshanSite.content = siteContent;
