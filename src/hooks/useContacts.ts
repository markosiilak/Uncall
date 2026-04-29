import { useState, useEffect } from 'react';
import * as Contacts from 'expo-contacts';

export const useContacts = () => {
  const [contactCount, setContactCount] = useState<number | null>(null);
  const [contacts, setContacts] = useState<any[]>([]);
  const [permissionStatus, setPermissionStatus] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (!isMounted) return;

      setPermissionStatus(status);
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Name, Contacts.Fields.PhoneNumbers],
        });
        if (isMounted) {
          setContactCount(data.length);
          setContacts(data);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { contactCount, contacts, permissionStatus };
};
