// src/lib/pages/MentorDetail.tsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { ArrowLeft, MessageCircle, Star, MapPin, Briefcase, Clock, Calendar, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Experience {
  role: string;
  company: string;
  duration: string;
}

interface Education {
  degree: string;
  institution: string;
  year: string;
}

interface TimeSlot {
  id: number;
  date: string;
  time: string;
  timezone: string;
}

const MentorDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  
  // In a real app, you would fetch this data based on the ID
  const mentor = {
    id: id ? parseInt(id) : 1,
    name: "Dr. Priya Sharma",
    role: "Senior Software Engineer",
    company: "TechCorp",
    location: "Bangalore, India",
    expertise: ["Career Growth", "Tech Leadership", "Interview Prep", "Salary Negotiation", "Resume Review"],
    rating: 4.9,
    sessions: 245,
    about: "With over 10 years of experience in the tech industry, I've helped hundreds of professionals advance their careers. I specialize in helping women in tech navigate challenges and achieve their career goals.",
    experience: [
      { role: "Senior Software Engineer", company: "TechCorp", duration: "2020 - Present" },
      { role: "Tech Lead", company: "InnovateX", duration: "2017 - 2020" },
      { role: "Software Developer", company: "CodeCraft", duration: "2014 - 2017" }
    ] as Experience[],
    education: [
      { degree: "M.S. in Computer Science", institution: "IIT Bombay", year: "2014" },
      { degree: "B.Tech in Computer Science", institution: "NIT Trichy", year: "2012" }
    ] as Education[],
    availableSlots: [
      { id: 1, date: "2023-11-20", time: "10:00 AM", timezone: "IST" },
      { id: 2, date: "2023-11-20", time: "2:00 PM", timezone: "IST" },
      { id: 3, date: "2023-11-21", time: "11:00 AM", timezone: "IST" },
      { id: 4, date: "2023-11-22", time: "3:00 PM", timezone: "IST" },
    ] as TimeSlot[],
    image: "https://randomuser.me/api/portraits/women/43.jpg"
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header title="Mentor Profile" backButton />
      
      <main className="max-w-3xl mx-auto px-4">
        <div className="relative h-48 bg-gradient-to-r from-blue-50 to-purple-50 rounded-b-2xl">
          <div className="absolute -bottom-12 left-6">
            <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
              <img 
                src={mentor.image} 
                alt={mentor.name} 
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="px-4 mt-14">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{mentor.name}</h1>
              <p className="text-muted-foreground">{mentor.role} at {mentor.company}</p>
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                {mentor.location}
              </div>
            </div>
            <div className="flex items-center bg-amber-50 text-amber-700 px-3 py-1 rounded-full text-sm">
              <Star className="h-4 w-4 fill-amber-500 text-amber-500 mr-1" />
              <span className="font-medium">{mentor.rating}</span>
              <span className="mx-1">•</span>
              <span>{mentor.sessions} sessions</span>
            </div>
          </div>

          <div className="mt-8">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="book">Book</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium text-foreground mb-2">About</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {mentor.about}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-foreground mb-3">Expertise</h3>
                    <div className="flex flex-wrap gap-2">
                      {mentor.expertise.map((skill, i) => (
                        <span 
                          key={i} 
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="experience" className="pt-6">
                <div className="space-y-8">
                  <div>
                    <h3 className="font-medium text-foreground mb-4">Work Experience</h3>
                    <div className="space-y-6">
                      {mentor.experience.map((exp, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5"></div>
                            {i < mentor.experience.length - 1 && (
                              <div className="h-full w-0.5 bg-border my-1.5"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{exp.role}</p>
                            <p className="text-sm text-muted-foreground">{exp.company}</p>
                            <p className="text-xs text-muted-foreground mt-1">{exp.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-foreground mb-4">Education</h3>
                    <div className="space-y-6">
                      {mentor.education.map((edu, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-primary mt-1.5"></div>
                            {i < mentor.education.length - 1 && (
                              <div className="h-full w-0.5 bg-border my-1.5"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{edu.degree}</p>
                            <p className="text-sm text-muted-foreground">{edu.institution}</p>
                            <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="book" className="pt-6">
                <div className="space-y-6">
                  <div className="bg-blue-50 p-5 rounded-xl border border-blue-100">
                    <h3 className="font-medium text-foreground mb-3">Available Time Slots</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Select a time slot that works best for you. Sessions are 30 minutes long.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {mentor.availableSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedSlot(slot.id === selectedSlot ? null : slot.id)}
                          className={`p-3 rounded-lg border text-left transition-colors ${
                            selectedSlot === slot.id
                              ? 'border-primary bg-primary/10 text-primary'
                              : 'border-border hover:bg-muted/50'
                          }`}
                        >
                          <div className="font-medium">{slot.time}</div>
                          <div className="text-sm text-muted-foreground">{slot.date}</div>
                        </button>
                      ))}
                    </div>

                    {selectedSlot && (
                      <div className="mt-6 pt-4 border-t border-border">
                        <Button className="w-full" size="lg">
                          <Calendar className="h-4 w-4 mr-2" />
                          Book Session
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="bg-amber-50 p-5 rounded-xl border border-amber-100">
                    <h3 className="font-medium text-foreground mb-3">What to expect</h3>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>30-minute video call with {mentor.name.split(' ')[0]}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Personalized advice and guidance</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Follow-up resources and next steps</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default MentorDetail;