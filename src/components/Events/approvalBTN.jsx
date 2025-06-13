"use client"

import { Switch } from "@/components/ui/switch";
import {updateEventApprovalStatus} from '@/app/actions/EventActions'

export function ApprovalToggle({ id, approved }) {
    const updateApproval = async (checked) => {
      console.log(id)
      console.log("HUU")
      await updateEventApprovalStatus( id, checked);
    };
  
    return (
      <Switch
        defaultChecked={approved}
        onCheckedChange={updateApproval}
        className="data-[state=checked]:bg-green-500"
      />
    );
  }