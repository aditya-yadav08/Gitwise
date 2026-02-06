'use client';

import { useEffect } from 'react';
import { syncUserAction } from './actions';

export default function SyncUserPage() {
  useEffect(() => {
    syncUserAction();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center">
      <p className="text-muted-foreground">
        Setting up your account…
      </p>
    </div>
  );
}