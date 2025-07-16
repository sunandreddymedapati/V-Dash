import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgot, setShowForgot] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [showForgotSent, setShowForgotSent] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: Add real login logic.
    navigate("/dashboard");
  }

  function handleForgotSubmit(e) {
    e.preventDefault();
    e.stopPropagation(); // Prevents bubbling to the Login form!
    setShowForgot(false);
    setShowForgotSent(true);
    setTimeout(() => setShowForgotSent(false), 2500);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-slate-800">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="text-center flex flex-col items-center space-y-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-t-lg">
          <div className="flex flex-col items-center mt-2 mb-2">
            <img
              src="/lovable-uploads/93f720ee-4579-442c-898f-915bbafcab8a.png"
              alt="V-Dash Logo"
              style={{ width: 200, height: "auto" }}
              className="rounded-md drop-shadow-lg mb-2"
            />
          </div>
          <CardTitle className="text-gray-800 text-2xl font-bold">Login</CardTitle>
        </CardHeader>
        <CardContent className="bg-white rounded-b-lg py-6 px-8">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="text-gray-800 mb-1 block">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@email.com"
                autoComplete="username"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="bg-gray-50"
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-800 mb-1 block">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="bg-gray-50"
              />
            </div>
            <Button
              type="submit"
              className="mt-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-semibold shadow hover:from-yellow-400 hover:to-yellow-500 transition"
            >
              Login
            </Button>
            <div className="flex justify-end">
              <Dialog open={showForgot} onOpenChange={setShowForgot}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-yellow-600 hover:text-yellow-700 text-sm font-medium underline mt-2 transition"
                    tabIndex={0}
                    onClick={() => setShowForgot(true)}
                  >
                    Forgot Password?
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Forgot Password</DialogTitle>
                    <DialogDescription>
                      Enter your email to receive a reset link.
                    </DialogDescription>
                  </DialogHeader>
                  <form
                    className="flex flex-col gap-4 mt-2"
                    onSubmit={handleForgotSubmit}
                  >
                    <div>
                      <Label htmlFor="forgot-email">Email Address</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={forgotEmail}
                        onChange={e => setForgotEmail(e.target.value)}
                        className="mt-1"
                        autoFocus
                      />
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        className="w-full mt-2 bg-yellow-600 hover:bg-yellow-700 text-white"
                      >
                        Submit
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            {showForgotSent && (
              <div className="text-green-600 text-center text-sm mt-2">
                If your email is registered, a reset link was sent.
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
