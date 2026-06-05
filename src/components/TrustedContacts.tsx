import { useState } from "react";
import { Plus, Phone, Edit2, Check, X, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import type { EmergencyContact } from "@/services/twilioService";

const DEFAULT_CONTACTS: EmergencyContact[] = [
  { name: "Mom", phone: "", email: "" },
  { name: "Sister", phone: "", email: "" },
  { name: "Best Friend", phone: "", email: "" },
];

export const TrustedContacts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [contacts, setContacts] = useState<EmergencyContact[]>(() => {
    const stored = localStorage.getItem("trustedContacts");
    return stored ? JSON.parse(stored) : DEFAULT_CONTACTS;
  });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFormData, setEditFormData] = useState<EmergencyContact>({
    name: "",
    phone: "",
    email: "",
  });
  const [newContact, setNewContact] = useState<EmergencyContact>({
    name: "",
    phone: "",
    email: "",
  });

  const saveContactsToStorage = (updatedContacts: EmergencyContact[]) => {
    localStorage.setItem("trustedContacts", JSON.stringify(updatedContacts));
    setContacts(updatedContacts);
  };

  const handleAddContact = () => {
    if (!newContact.name || !newContact.phone) {
      toast({
        title: "Error",
        description: "Please fill in name and phone number",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number format (basic validation)
    if (!newContact.phone.match(/^[\d\s\-\+\(\)]+$/)) {
      toast({
        title: "Error",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }

    const updatedContacts = [...contacts, newContact];
    saveContactsToStorage(updatedContacts);
    setNewContact({ name: "", phone: "", email: "" });
    setIsOpen(false);

    toast({
      title: "Contact Added",
      description: `${newContact.name} has been added to your emergency contacts`,
    });
  };

  const handleEditStart = (index: number) => {
    setEditingIndex(index);
    setEditFormData(contacts[index]);
  };

  const handleEditSave = (index: number) => {
    if (!editFormData.name || !editFormData.phone) {
      toast({
        title: "Error",
        description: "Please fill in name and phone number",
        variant: "destructive",
      });
      return;
    }

    const updatedContacts = [...contacts];
    updatedContacts[index] = editFormData;
    saveContactsToStorage(updatedContacts);
    setEditingIndex(null);

    toast({
      title: "Contact Updated",
      description: `${editFormData.name} has been updated`,
    });
  };

  const handleEditCancel = () => {
    setEditingIndex(null);
    setEditFormData({ name: "", phone: "", email: "" });
  };

  const handleDeleteContact = (index: number) => {
    const contactName = contacts[index].name;
    const updatedContacts = contacts.filter((_, i) => i !== index);
    saveContactsToStorage(updatedContacts);

    toast({
      title: "Contact Deleted",
      description: `${contactName} has been removed from your emergency contacts`,
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const colorClasses = [
    "bg-coral",
    "bg-purple-accent",
    "bg-teal-safe",
    "bg-gold",
    "bg-rose",
  ];

  const getColorClass = (index: number) => {
    return colorClasses[index % colorClasses.length];
  };

  return (
    <div className="p-4 bg-card rounded-2xl border border-border shadow-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-foreground">
          Trusted Contacts
        </h3>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 text-primary">
              <Plus className="h-4 w-4 mr-1" />
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Emergency Contact</DialogTitle>
              <DialogDescription>
                Add a trusted contact who will receive emergency notifications
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <Input
                  placeholder="Contact name"
                  value={newContact.name}
                  onChange={(e) =>
                    setNewContact({ ...newContact, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number *
                </label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={newContact.phone}
                  onChange={(e) =>
                    setNewContact({ ...newContact, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email (optional)
                </label>
                <Input
                  placeholder="email@example.com"
                  type="email"
                  value={newContact.email || ""}
                  onChange={(e) =>
                    setNewContact({ ...newContact, email: e.target.value })
                  }
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button
                  onClick={handleAddContact}
                  className="flex-1"
                  variant="default"
                >
                  Add Contact
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-wrap gap-4">
        {contacts.map((contact, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-2 flex-1 min-w-[100px]"
          >
            {editingIndex === index ? (
              <div className="w-full space-y-2">
                <Input
                  value={editFormData.name}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, name: e.target.value })
                  }
                  placeholder="Name"
                  className="text-xs"
                />
                <Input
                  value={editFormData.phone}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, phone: e.target.value })
                  }
                  placeholder="Phone"
                  className="text-xs"
                />
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 flex-1"
                    onClick={() => handleEditSave(index)}
                  >
                    <Check className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 flex-1"
                    onClick={handleEditCancel}
                  >
                    <X className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className={`h-14 w-14 rounded-full ${getColorClass(
                    index
                  )} flex items-center justify-center text-primary-foreground font-display font-bold text-lg shadow-soft`}
                >
                  {getInitials(contact.name)}
                </div>
                <span className="text-xs text-muted-foreground text-center max-w-[80px] truncate">
                  {contact.name}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    title={`Call ${contact.name}`}
                    onClick={() => {
                      window.location.href = `tel:${contact.phone}`;
                    }}
                  >
                    <Phone className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7"
                    title={`Edit ${contact.name}`}
                    onClick={() => handleEditStart(index)}
                  >
                    <Edit2 className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive hover:text-destructive"
                    title={`Remove ${contact.name}`}
                    onClick={() => handleDeleteContact(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}

        {/* Add new contact button */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <div className="flex flex-col items-center gap-2 flex-1 min-w-[100px]">
              <button 
                className="h-14 w-14 rounded-full border-2 border-dashed border-border flex items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                title="Add new emergency contact"
                aria-label="Add new emergency contact"
              >
                <Plus className="h-5 w-5" />
              </button>
              <span className="text-xs text-muted-foreground">Add New</span>
            </div>
          </DialogTrigger>
        </Dialog>
      </div>

      {contacts.length === 0 && (
        <div className="text-center py-6 text-muted-foreground text-sm">
          <p>No emergency contacts added yet.</p>
          <p className="text-xs mt-1">Add contacts to receive emergency alerts</p>
        </div>
      )}
    </div>
  );
};
