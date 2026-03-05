import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import PdfIcon from "/PdfIcon.svg";
import { Link } from "react-router";
import { APPROUTES } from "@/constant/routes";
export default function LandingPage() {
  return (
    <div className=" text-foreground h-full">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute bottom-[10%] right-[10%] h-[30%] w-[30%] rounded-full bg-purple-600/10 blur-[120px]" />
      </div>

      <main className="relative z-10">
        <section className="container mx-auto px-6 pt-24 pb-12">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-3">
            <div className="flex flex-col gap-6">
              <Badge
                variant="secondary"
                className="w-fit gap-2 border-border bg-accent/10 text-accent-foreground"
              >
                <Sparkles className="h-3 w-3" /> New: AI-Powered Extraction
              </Badge>
              <h1 className="text-5xl font-extrabold tracking-tight text-foreground lg:text-6xl">
                Extract PDF <br /> Pages with{" "}
                <span className="  text-foreground">Precision</span>
              </h1>
              <p className="max-w-xs text-card-foreground leading-relaxed">
                Select, Stitch, and Download Your Perfect Document in Seconds.
                No more bloated files.
              </p>
            </div>

            <div className="flex justify-center h-72">
              <img src={PdfIcon} alt="" />
            </div>

            <div className="flex flex-col gap-4">
              <Link to={APPROUTES.Home}>
                <Button
                  size="lg"
                  className="group w-full bg-primary hover:bg-primary/45"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
