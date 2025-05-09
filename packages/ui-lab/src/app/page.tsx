import Link from 'next/link';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../components/ui/card';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-center font-bold text-4xl">UI Lab</h1>
        <p className="text-center text-muted-foreground">
          A playground for UI components and design patterns
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Components</CardTitle>
              <CardDescription>
                Explore the available UI components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Browse through our collection of reusable UI components built
                with Radix UI and styled with Tailwind CSS.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href="/components">View Components</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Patterns</CardTitle>
              <CardDescription>Common UI patterns and layouts</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Discover reusable patterns and layouts to solve common design
                challenges in your applications.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/patterns">Explore Patterns</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Examples</CardTitle>
              <CardDescription>See components in action</CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                View real-world examples of our components and patterns working
                together in various scenarios.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/examples">View Examples</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  );
}
