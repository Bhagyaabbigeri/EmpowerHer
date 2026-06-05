import { Phone, Plus, User, Trash2, Edit, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Contact {
  id: string;
  name: string;
  phone: string;
  isPrimary: boolean;
}

export default function EmergencyContactsPage() {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({ name: '', phone: '' });
  const [contacts, setContacts] = useState<Contact[]>(() => {
    const saved = localStorage.getItem('emergencyContacts');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Police', phone: '100', isPrimary: true },
      { id: '2', name: 'Women Helpline', phone: '1091', isPrimary: true },
      { id: '3', name: 'Ambulance', phone: '108', isPrimary: true }
    ];
  });

  const saveContacts = (updatedContacts: Contact[]) => {
    setContacts(updatedContacts);
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
  };

  const addContact = () => {
    if (newContact.name && newContact.phone) {
      const contact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        isPrimary: false
      };
      const updatedContacts = [...contacts, contact];
      saveContacts(updatedContacts);
      setNewContact({ name: '', phone: '' });
      setIsAdding(false);
    }
  };

  const removeContact = (id: string) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    saveContacts(updatedContacts);
  };

  const makePrimary = (id: string) => {
    const updatedContacts = contacts.map(contact => ({
      ...contact,
      isPrimary: contact.id === id
    }));
    saveContacts(updatedContacts);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-8">
        <Button 
          variant="ghost" 
          size="icon" 
          className="mr-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Emergency Contacts</h1>
          <p className="text-gray-600">Manage your emergency contacts and support services</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold">Emergency Numbers</h2>
              <p className="text-gray-600">Quick access to important emergency contacts</p>
            </div>
            {!isAdding && (
              <Button onClick={() => setIsAdding(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Contact
              </Button>
            )}
          </div>
        </div>

        {isAdding && (
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Input
                  placeholder="Name"
                  value={newContact.name}
                  onChange={(e) => setNewContact({...newContact, name: e.target.value})}
                />
              </div>
              <div className="md:col-span-1">
                <Input
                  placeholder="Phone Number"
                  value={newContact.phone}
                  onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={addContact} className="w-full">Save</Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setIsAdding(false);
                    setNewContact({ name: '', phone: '' });
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="divide-y divide-gray-200">
          {contacts.map((contact) => (
            <div key={contact.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-full ${contact.isPrimary ? 'bg-red-100' : 'bg-gray-100'}`}>
                  <Phone className={`h-5 w-5 ${contact.isPrimary ? 'text-red-600' : 'text-gray-600'}`} />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="text-blue-600 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {!contact.isPrimary && (
                  <>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => makePrimary(contact.id)}
                    >
                      <User className="h-4 w-4 mr-1" />
                      Make Primary
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => removeContact(contact.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
                {contact.isPrimary && (
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                    Primary
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
        <h3 className="font-medium text-lg text-blue-800 mb-3">Default Emergency Numbers</h3>
        <p className="text-gray-700 mb-4">
          These numbers are always available and cannot be removed. You can add your personal emergency contacts above.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {contacts.filter(c => c.isPrimary).map((contact) => (
            <div key={contact.id} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-full">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">{contact.name}</p>
                  <a 
                    href={`tel:${contact.phone}`} 
                    className="text-blue-600 hover:underline"
                  >
                    {contact.phone}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
