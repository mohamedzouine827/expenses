import { PenBox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
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
import EmojiPicker from "emoji-picker-react";
import { Input } from "@/components/ui/input";
import { db } from "@/utils/dbConfig";
import { Budgets } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

function EditBudget({ budgetInfo, refreshData }) {
    const [isLoading, setIsLoading] = useState(!budgetInfo);
    const [emojiIcon, setEmojiIcon] = useState(() => budgetInfo?.icon || "");
    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [name, setName] = useState(() => budgetInfo?.name || "");
    const [amount, setAmount] = useState(() => budgetInfo?.amount || "");
    const { user } = useUser();

    useEffect(()=> {
        if (budgetInfo) {
            setEmojiIcon(budgetInfo.icon)
            setIsLoading(false);
        }
    },[budgetInfo])

    if (isLoading) {
        return <div>Loading...</div>; // Or your custom loading component
    }

    const onUpdateBudget = async() => {
        const result = await db.update(Budgets).set({
            name: name,
            amount: amount,
            icon: emojiIcon
        }).where(eq(Budgets.id, budgetInfo.id)).returning();

        if (result) {
            toast('Budget Updated');
            refreshData();
        }
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="flex gap-2"><PenBox /> Edit</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Update Budget</DialogTitle>
                    <DialogDescription>
                        <div className="mt-4">
                            <Button size="lg" onClick={() => setOpenEmojiPicker(!openEmojiPicker)} variant="outline">{emojiIcon}</Button>
                            <div className="absolute">
                                <EmojiPicker open={openEmojiPicker} onEmojiClick={(e) => {
                                    setOpenEmojiPicker(false);
                                    setEmojiIcon(e.emoji);
                                }} />
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <h2 className="text-black font-medium my-1">Budget Name</h2>
                                <Input required defaultValue={budgetInfo?.name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mt-4 flex flex-col gap-2">
                                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                                <Input required type="number" defaultValue={budgetInfo?.amount} onChange={(e) => setAmount(e.target.value)} />
                            </div>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-start">
                    <DialogClose asChild>
                        <Button onClick={() => onUpdateBudget()} className="mt-4 flex justify-center items-center">Update Budget</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default EditBudget;
