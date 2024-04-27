import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { toast } from "sonner"

function CreateBudget({refreshData} : {refreshData: any}) {

  const [emojiIcon, setEmojiIcon] = useState('🙂');
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const {user} = useUser();

  const onCreateBudget=async()=>{
    const result = await db.insert(Budgets)
    .values({
      name: name || '',
      createdBy: user?.primaryEmailAddress?.emailAddress || '',
      amount: amount || '',
      icon: emojiIcon || ''
    });

    if (result) {
      refreshData();
      toast("Budget Created");
    }
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div>
          <div className="bg-slate-300 p-10 rounded-md items-center flex flex-col border-2 cursor-pointer hover:shadow-md transition-all duration-300 ease-in-out">
            <h2 className="text-3xl">+</h2>
            <h2>Create New Budget</h2>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Budget</DialogTitle>
          <DialogDescription>
            <div className="mt-4">
            <Button size="lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)} variant="outline">{emojiIcon}</Button>
            <div className="absolute">
              <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                setOpenEmojiPicker(false)
                setEmojiIcon(e.emoji)}}/>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h2 className="text-black font-medium my-1">Budget Name</h2>
              <Input required placeholder="e.g. Home Car..." onChange={(e) =>setName(e.target.value)}/>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <h2 className="text-black font-medium my-1">Budget Amout</h2>
              <Input required type="number" placeholder="e.g. 200 300..." onChange={(e) =>setAmount(e.target.value)}/>
            </div>
            
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
          <Button onClick={() => onCreateBudget()} className="mt-4 flex justify-center items-center">Create Budget</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBudget;
