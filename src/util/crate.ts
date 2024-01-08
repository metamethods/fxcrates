import { CratesIO } from 'crates.io';

import type { Crate, User } from 'crates.io';

const cratesIO = new CratesIO();

export async function fetchCrate(crate: string): Promise<Crate | null> {
  return await cratesIO.api.crates.getCrate(crate)
    .then((crate) => crate.crate)
    .catch(() => null);
}

export async function getOwners(crate: string): Promise<User[]> {
  return await cratesIO.api.crates.getOwners(crate)
    .then((users) => users.users);
}