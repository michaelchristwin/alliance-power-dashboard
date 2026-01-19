import { createFileRoute } from "@tanstack/react-router";
import { CircleDollarSign, HousePlug } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/payment")({
  component: RouteComponent,
  head: () => ({
    meta: [
      { title: "Payment - Alliance Power Dashboard" },
      {
        name: "description",
        content: "Recharge your meter, settle your bills, purchase power here.",
      },
    ],
  }),
});

function RouteComponent() {
  return (
    <div className="flex w-full justify-center">
      <Card className="md: h-[330px] dark:bg-gray-800 dark:text-white bg-white text-gray-800 mt-[40px]">
        <CardHeader className="hidden"></CardHeader>
        <CardContent className="w-full">
          <Tabs defaultValue="fiat" className="md:w-[400px] w-[300px]">
            <TabsList className="w-full bg-background">
              <TabsTrigger value="fiat">Fiat</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
            </TabsList>
            <TabsContent value="fiat" className="mt-7 w-full">
              <form action="" className="space-y-6">
                <fieldset className="relative">
                  <HousePlug className="absolute text-[16px] text-neutral-500 top-[50%] left-1 -translate-y-[50%]" />

                  <input
                    type="text"
                    placeholder="Enter M3ter ID"
                    className="h-[40px] w-[90%] ps-9 rounded border-b outline-none"
                  />
                </fieldset>
                <fieldset className="relative">
                  <CircleDollarSign className="absolute text-[16px] text-neutral-500 top-[50%] left-1 -translate-y-[50%]" />
                  <input
                    type="text"
                    placeholder="Enter amount in USD"
                    className="h-[40px] w-[90%] ps-9 rounded border-b outline-none"
                  />
                </fieldset>
                <button className="bg-green-500 mt-5 rounded-lg w-full h-[50px]">
                  Pay with Stripe
                </button>
              </form>
            </TabsContent>
            <TabsContent value="crypto" className="mt-7 w-full">
              <form action="" className="space-y-6">
                <fieldset className="relative">
                  <HousePlug className="absolute text-[16px] text-neutral-500 top-[50%] left-1 -translate-y-[50%]" />

                  <input
                    type="text"
                    placeholder="Enter M3ter ID"
                    className="h-[40px] w-[90%] ps-9 rounded border-b outline-none"
                  />
                </fieldset>
                <fieldset className="relative">
                  <CircleDollarSign className="absolute text-[16px] text-neutral-500 top-[50%] left-1 -translate-y-[50%]" />
                  <input
                    type="text"
                    placeholder="Enter amount"
                    className="h-[40px] w-[90%] ps-9 rounded border-b outline-none"
                  />
                </fieldset>
                <button className="bg-green-500 mt-5 rounded-lg w-full h-[50px]">
                  Pay with USDC
                </button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="hidden"></CardFooter>
      </Card>
    </div>
  );
}
