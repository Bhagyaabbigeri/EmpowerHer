import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Calendar, Heart, MessageSquare, ThumbsUp } from "lucide-react";

const Community = () => {
  // Sample community posts data
  const communityPosts = [
    {
      id: 1,
      user: "Priya S.",
      role: "Mentor | Tech Industry",
      content: "Just hosted a workshop on career growth in tech! So many amazing women joined. Let me know if you'd like the recording or have any questions. #WomenInTech #CareerGrowth",
      likes: 24,
      comments: 8,
      timeAgo: "2h ago"
    },
    {
      id: 2,
      user: "Ananya M.",
      role: "Entrepreneur",
      content: "Looking for advice on balancing work and family life. How do you all manage it? Would love to hear your experiences and tips! #WorkLifeBalance #SupportSystem",
      likes: 15,
      comments: 12,
      timeAgo: "5h ago"
    },
    {
      id: 3,
      user: "Meera K.",
      role: "Student | Delhi University",
      content: "Just joined this amazing community! Excited to connect with all the inspiring women here. I'm studying computer science and would love to connect with others in the field. #NewHere #CSStudent",
      likes: 32,
      comments: 10,
      timeAgo: "1d ago"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Community" />
      
      <main className="px-4 py-6 space-y-6 max-w-lg mx-auto">
        {/* Community Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Community Hub</h1>
          <Button size="sm" variant="outline" className="gap-2">
            <MessageCircle className="h-4 w-4" />
            New Post
          </Button>
        </div>

        {/* Upcoming Events */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-medium text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Upcoming Events
            </h2>
            <Button variant="ghost" size="sm" className="text-primary">
              See All
            </Button>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium">Financial Independence Workshop</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>Tomorrow, 6 PM</span>
                <span>•</span>
                <span>Online</span>
              </div>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <div className="font-medium">Networking Mixer</div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <span>Mar 15, 7 PM</span>
                <span>•</span>
                <span>Bangalore</span>
              </div>
            </div>
          </div>
        </div>

        {/* Discussion Feed */}
        <div className="space-y-4">
          <h2 className="font-medium text-foreground">Recent Discussions</h2>
          
          {communityPosts.map((post) => (
            <div key={post.id} className="bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center text-white font-medium">
                  {post.user.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{post.user}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.timeAgo}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mb-2">{post.role}</div>
                  <p className="text-sm text-foreground mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <button className="flex items-center gap-1 hover:text-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-foreground">
                      <MessageSquare className="h-4 w-4" />
                      <span>{post.comments} comments</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Community;
