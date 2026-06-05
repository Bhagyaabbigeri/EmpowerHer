import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Home
        </Button>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">About EmpowerHer</h1>
            <p className="text-lg text-muted-foreground">Empowering Women, Building Futures</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-16">
            {/* About the Developer */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">About the Developer</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground mt-6">
                EmpowerHer was developed by <span className="font-semibold text-foreground">Bhagyashree Reddy</span>, 
                a passionate 7th semester B.Tech Computer Science and Engineering student. 
                This project represents a culmination of technical skills and a strong commitment 
                to women's safety and empowerment.
              </p>
            </div>

            {/* Our Mission */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground mt-6">
                EmpowerHer is a comprehensive safety and empowerment platform designed specifically for women. 
                Our mission is to create a safer environment and provide essential resources for women to 
                navigate their daily lives with confidence and security.
              </p>
            </div>

            {/* Project Overview */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Project Overview</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground mt-6">
                The EmpowerHer app was created to address the critical need for women's safety in today's world. 
                With increasing concerns about personal security, especially for women traveling or commuting 
                alone, we recognized the need for a reliable, easy-to-use safety solution.
              </p>
            </div>

            {/* Technical Implementation */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Technical Implementation</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground mt-6">
                Built with modern web technologies, EmpowerHer combines real-time location tracking, 
                secure cloud infrastructure, and intuitive user interfaces to deliver a seamless 
                experience. The app prioritizes user privacy and data security at every level.
              </p>
            </div>

            {/* Why We Built This */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Why We Built This</h2>
              <div className="h-1 w-20 bg-primary mx-auto rounded-full"></div>
              <p className="text-lg text-muted-foreground mt-6">
                As developers and concerned citizens, we believe technology should be leveraged to 
                create safer communities. EmpowerHer is our contribution to making public spaces 
                more accessible and secure for women everywhere.
              </p>
            </div>
            
            <div className="mt-12 pt-8 border-t border-border">
              <h3>Contact Us</h3>
              <p>
                Have questions or feedback? We'd love to hear from you at 
                <a href="mailto:contact@empowerher.app" className="text-primary hover:underline">
                  contact@empowerher.app
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
