import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from "@/components/ui/card";
import { RocketIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">404 - Page Not Found</CardTitle>
          <CardDescription>
            Oops! The page you're looking for doesn't exist.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-center py-6">
            <RocketIcon className="w-16 h-16 text-muted-foreground" />
          </div>
          <p className="text-center text-muted-foreground">
            The page may have been moved or deleted. Let's get you back on track.
          </p>
          <Button 
            onClick={() => navigate("/")}
            className="mt-4"
          >
            Return Home
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default NotFound;    