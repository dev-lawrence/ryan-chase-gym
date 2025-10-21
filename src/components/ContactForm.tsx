import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function ContactForm() {
  return (
    <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8">
      <form className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" type="text" placeholder="John Doe" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" placeholder="+234 800 000 0000" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="goal">Your Goal</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your goal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weight-loss">Weight Loss</SelectItem>
              <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
              <SelectItem value="strength">Strength Building</SelectItem>
              <SelectItem value="endurance">Endurance</SelectItem>
              <SelectItem value="general">General Fitness</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">
            Tell me about your current fitness level and challenges
          </Label>
          <Textarea
            id="message"
            placeholder="I'm currently training 3 times a week but struggling with consistency..."
            className="resize-none h-24"
          />
        </div>

        <Button type="submit" className="w-full cursor-pointer" size="lg">
          Schedule Consultation
        </Button>

        <p className="text-center text-sm text-muted-foreground">
          I'll get back to you within 24 hours
        </p>
      </form>
    </div>
  );
}
