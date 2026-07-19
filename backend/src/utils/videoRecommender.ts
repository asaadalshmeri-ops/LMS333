export interface RecommendedVideo {
  title: string;
  channel: string;
  thumbnail: string;
  url: string;
}

const VIDEO_DATABASE: Record<string, RecommendedVideo[]> = {
  math: [
    {
      title: "شرح التباديل والتوافيق بطريقة مبسطة - ثالث ثانوي علمي",
      channel: "الرياضيات اليمنية التفاعلية",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
      url: "https://www.youtube.com/watch?v=math_permutations_yemen"
    },
    {
      title: "مبدأ العد الأساسي - حل المسائل الوزارية المتكررة",
      channel: "بوابة التعليم الوطنية",
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80",
      url: "https://www.youtube.com/watch?v=math_counting_yemen"
    }
  ],
  physics: [
    {
      title: "دوائر التيار المتردد: المكثف سعة ثابتة - شرح الأستاذ القدير طه الشميري",
      channel: "قناة التلفزيون التعليمي اليمني",
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
      url: "https://www.youtube.com/watch?v=phys_ac_capacitor_yemen"
    },
    {
      title: "المفاعلة السعوية وزاوية الطور - تجربة عملية وتفكيك القوانين",
      channel: "فيزياء الثالث الثانوي العلمي",
      thumbnail: "https://images.unsplash.com/photo-1507668077129-56e32842fceb?w=400&q=80",
      url: "https://www.youtube.com/watch?v=phys_phase_angle_yemen"
    }
  ],
  chemistry: [
    {
      title: "سرعة التفاعلات الكيميائية وثابت معدل التفاعل - المنهج اليمني",
      channel: "الكيمياء للجميع",
      thumbnail: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=400&q=80",
      url: "https://www.youtube.com/watch?v=chem_rate_yemen"
    }
  ]
};

export function getRecommendedVideos(subjectSlug: string, lessonTitle: string): RecommendedVideo[] {
  const normalizedSlug = subjectSlug.toLowerCase();
  const normalizedTitle = lessonTitle.toLowerCase();

  // Find exact subject recommendations
  if (VIDEO_DATABASE[normalizedSlug]) {
    const list = VIDEO_DATABASE[normalizedSlug];
    // Filter matching title terms
    const filtered = list.filter(v => 
      normalizedTitle.split(" ").some(word => v.title.toLowerCase().includes(word) || v.title.toLowerCase().includes(normalizedSlug))
    );
    return filtered.length > 0 ? filtered : [list[0]]; // return first as fallback if none match the title directly
  }

  return [];
}
