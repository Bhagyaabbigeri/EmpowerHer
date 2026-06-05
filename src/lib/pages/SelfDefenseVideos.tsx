import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, AlertTriangle, Shield, Zap, Target, Clock, MapPin, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

interface Video {
  id: string;
  title: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  youtubeId: string;
  thumbnail: string;
}

interface VideoCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  videos: Video[];
}

// Error Boundary Component
class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error in SelfDefenseVideos:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
          <p className="text-muted-foreground mb-4">
            We're having trouble loading the self-defense videos. Please try again later.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const SelfDefenseVideos = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (youtubeId: string) => {
    setSelectedVideo(youtubeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  const getLevelBadge = (level: string) => {
    const baseClasses = 'text-xs font-medium px-2 py-1 rounded-full';
    switch (level) {
      case 'Beginner':
        return <span className={`${baseClasses} bg-green-100 text-green-800`}>Beginner</span>;
      case 'Intermediate':
        return <span className={`${baseClasses} bg-blue-100 text-blue-800`}>Intermediate</span>;
      case 'Advanced':
        return <span className={`${baseClasses} bg-red-100 text-red-800`}>Advanced</span>;
      default:
        return <span className={`${baseClasses} bg-gray-100 text-gray-800`}>{level}</span>;
    }
  };

  const categories: VideoCategory[] = [
    {
      id: 'basic-moves',
      title: 'Basic Self-Defense Moves',
      icon: <Shield className="w-5 h-5 text-blue-500" />,
      videos: [
        {
          id: 'basic-1',
          title: 'Basic Stance and Movement',
          duration: '5:22',
          level: 'Beginner',
          youtubeId: 'C5t3NQCKV90',
          thumbnail: 'https://img.youtube.com/vi/C5t3NQCKV90/maxresdefault.jpg'
        },
      {
        id: 'basic-1',
        title: 'Basic Stance and Movement',
        duration: '5:22',
        level: 'Beginner',
        youtubeId: 'C5t3NQCKV90',
        thumbnail: 'https://img.youtube.com/vi/C5t3NQCKV90/maxresdefault.jpg'
      },
        {
          id: 'basic-2',
          title: 'How to Break Free from Wrist Grabs',
          duration: '6:45',
          level: 'Beginner',
          youtubeId: '9G5HV5hB8uA',
          thumbnail: 'https://img.youtube.com/vi/9G5HV5hB8uA/maxresdefault.jpg'
        },
        {
          id: 'basic-3',
          title: 'Front Choke Defense',
          duration: '7:18',
          level: 'Beginner',
          youtubeId: 'FXjyaDd4GfM',
          thumbnail: 'https://img.youtube.com/vi/FXjyaDd4GfM/maxresdefault.jpg'
        }
      ]
    },
    {
      id: 'strikes',
      title: 'Striking Techniques',
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      videos: [
        {
          id: 'strike-1',
          title: 'Palm Strike to the Nose',
          duration: '4:30',
          level: 'Beginner',
          youtubeId: '3-n1vnhplYQ',
          thumbnail: 'https://img.youtube.com/vi/3-n1vnhplYQ/maxresdefault.jpg'
        },
        {
          id: 'strike-2',
          title: 'Knee Strikes for Self-Defense',
          duration: '5:52',
          level: 'Intermediate',
          youtubeId: '6xKZiWWN9Kk',
          thumbnail: 'https://img.youtube.com/vi/6xKZiWWN9Kk/maxresdefault.jpg'
        },
        {
          id: 'strike-3',
          title: 'Elbow Strikes in Close Combat',
          duration: '6:15',
          level: 'Intermediate',
          youtubeId: 'vBk0ZqbmX2w',
          thumbnail: 'https://img.youtube.com/vi/vBk0ZqbmX2w/maxresdefault.jpg'
        }
      ]
    },
    {
      id: 'ground-defense',
      title: 'Ground Defense',
      icon: <Target className="w-5 h-5 text-red-500" />,
      videos: [
        {
          id: 'ground-1',
          title: 'Getting Up Safely from the Ground',
          duration: '5:40',
          level: 'Beginner',
          youtubeId: '9v9N5KldBb8',
          thumbnail: 'https://img.youtube.com/vi/9v9N5KldBb8/maxresdefault.jpg'
        },
        {
          id: 'ground-2',
          title: 'Defending Against Mount Position',
          duration: '8:22',
          level: 'Intermediate',
          youtubeId: 'gZ1H2U0N1Xk',
          thumbnail: 'https://img.youtube.com/vi/gZ1H2U0N1Xk/maxresdefault.jpg'
        },
        {
          id: 'ground-3',
          title: 'Escaping from Side Control',
          duration: '7:15',
          level: 'Intermediate',
          youtubeId: 's9G0j7X6f7A',
          thumbnail: 'https://img.youtube.com/vi/s9G0j7X6f7A/maxresdefault.jpg'
        }
      ]
    },
    {
      id: 'weapons',
      title: 'Weapon Defense',
      icon: <AlertTriangle className="w-5 h-5 text-purple-500" />,
      videos: [
        {
          id: 'weapon-1',
          title: 'Defending Against Knife Threats',
          duration: '9:30',
          level: 'Advanced',
          youtubeId: 'XZEx6F9Lt8I',
          thumbnail: 'https://img.youtube.com/vi/XZEx6F9Lt8I/maxresdefault.jpg'
        },
        {
          id: 'weapon-2',
          title: 'Escaping from a Gun Threat',
          duration: '10:15',
          level: 'Advanced',
          youtubeId: '9G5HV5hB8uA',
          thumbnail: 'https://img.youtube.com/vi/9G5HV5hB8uA/maxresdefault.jpg'
        },
        {
          id: 'weapon-3',
          title: 'Using Everyday Objects for Self-Defense',
          duration: '7:45',
          level: 'Intermediate',
          youtubeId: 'FXjyaDd4GfM',
          thumbnail: 'https://img.youtube.com/vi/FXjyaDd4GfM/maxresdefault.jpg'
        }
      ]
    },
    {
      id: 'situational',
      title: 'Situational Awareness',
      icon: <Clock className="w-5 h-5 text-green-500" />,
      videos: [
        {
          id: 'situational-1',
          title: 'Avoiding Dangerous Situations',
          duration: '6:20',
          level: 'Beginner',
          youtubeId: 'C5t3NQCKV90',
          thumbnail: 'https://img.youtube.com/vi/C5t3NQCKV90/maxresdefault.jpg'
        },
        {
          id: 'situational-2',
          title: 'Using Your Voice as a Weapon',
          duration: '5:10',
          level: 'Beginner',
          youtubeId: '3-n1vnhplYQ',
          thumbnail: 'https://img.youtube.com/vi/3-n1vnhplYQ/maxresdefault.jpg'
        },
        {
          id: 'situational-3',
          title: 'Parking Lot Safety',
          duration: '7:30',
          level: 'Beginner',
          youtubeId: '6xKZiWWN9Kk',
          thumbnail: 'https://img.youtube.com/vi/6xKZiWWN9Kk/maxresdefault.jpg'
        }
      ]
    }
  ];

  const featuredVideos = [
    {
      id: 'featured-1',
      title: 'Top 5 Self-Defense Moves Every Woman Should Know',
      duration: '12:45',
      level: 'Beginner',
      views: '1.2M',
      youtubeId: 'C4vPEo0jXVs',
      thumbnail: 'https://img.youtube.com/vi/C4vPEo0jXVs/maxresdefault.jpg'
    },
    {
      id: 'featured-2',
      title: 'How to Defend Against Multiple Attackers',
      duration: '15:30',
      level: 'Advanced',
      views: '856K',
      youtubeId: 'wWYgw9emKrs',
      thumbnail: 'https://img.youtube.com/vi/wWYgw9emKrs/maxresdefault.jpg'
    },
    {
      id: 'featured-3',
      title: 'Self-Defense for Runners',
      duration: '8:20',
      level: 'Beginner',
      views: '1.5M',
      youtubeId: 't7kFBBT62L8',
      thumbnail: 'https://img.youtube.com/vi/t7kFBBT62L8/maxresdefault.jpg'
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Video Player Modal */}
          {selectedVideo && (
            <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={closeVideo}>
              <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="relative">
                  <button
                    onClick={closeVideo}
                    className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 z-10 hover:bg-red-600 transition-colors"
                    aria-label="Close video"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                  <YouTubeEmbed videoId={selectedVideo} />
                </div>
              </div>
            </div>
          )}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4">Self-Defense Video Tutorials</h1>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Learn practical self-defense techniques from experts. Practice regularly to build muscle memory and confidence.
            </p>
          </div>

          {/* Featured Videos */}
          <section className="mb-16">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <span>Featured Videos</span>
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {featuredVideos.map((video) => (
                <Card
                  key={video.id}
                  className="group overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => video.youtubeId && handleVideoClick(video.youtubeId)}
                >
                  <div className="relative aspect-video bg-gray-200">
                    {/* Thumbnail with Play Button */}
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://via.placeholder.com/800x450?text=Video+Thumbnail';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                        <Play className="w-6 h-6 text-white" fill="currentColor" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                      {video.duration}
                    </div>
                    <div className="absolute top-2 left-2">
                      {getLevelBadge(video.level)}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                      {video.title}
                    </h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Video Categories */}
          {categories.map((category) => (
            <section key={category.id} className="mb-12">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                {category.icon}
                {category.title}
              </h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {category.videos.map((video) => (
                  <Card
                    key={video.id}
                    className="group overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => video.youtubeId && handleVideoClick(video.youtubeId)}
                  >
                    <div className="relative aspect-video bg-gray-200">
                      {/* Thumbnail with Play Button */}
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = 'https://via.placeholder.com/800x450?text=Video+Thumbnail';
                        }}
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 bg-black/50 rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                          <Play className="w-6 h-6 text-white" fill="currentColor" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                        {video.duration}
                      </div>
                      <div className="absolute top-2 left-2">
                        {getLevelBadge(video.level)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          ))}

          {/* Safety Tips */}
          <section className="bg-blue-50 p-6 rounded-lg border border-blue-100 mt-12">
            <h2 className="text-xl font-semibold mb-4 text-blue-700 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Important Safety Tips
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span>Always be aware of your surroundings and trust your instincts.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span>Practice these techniques regularly to build muscle memory.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span>Your primary goal should always be to escape to safety.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="bg-blue-100 p-1 rounded-full mt-0.5">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span>Consider taking in-person self-defense classes for hands-on practice.</span>
              </li>
            </ul>
          </section>

          {/* Local Self-Defense Classes */}
          <section className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-red-500" />
                  Find Local Self-Defense Classes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Learning in person with a qualified instructor is the most effective way to master self-defense techniques.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">What to Look For:</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Certified instructors with experience in self-defense</li>
                      <li>• Small class sizes for personalized attention</li>
                      <li>• Realistic training scenarios</li>
                      <li>• Focus on awareness and prevention</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Search Online For:</h3>
                    <ul className="space-y-2 text-sm">
                      <li>• "Women's self-defense classes near me"</li>
                      <li>• "Krav Maga for women [your city]"</li>
                      <li>• "RAD self-defense program [your area]"</li>
                      <li>• "Women's safety workshops [your location]"</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
  );
};

// YouTube Embed Component
const YouTubeEmbed: React.FC<{ videoId: string }> = ({ videoId }) => (
  <div className="relative pb-[56.25%] h-0 overflow-hidden">
    <iframe
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      className="absolute top-0 left-0 w-full h-full"
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="YouTube video player"
    />
  </div>
);

export default SelfDefenseVideos;
