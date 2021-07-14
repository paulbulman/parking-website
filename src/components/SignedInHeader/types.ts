import { GroupName } from "../../context/auth/types";

export interface SignedInHeaderProps {
  groups: GroupName[];
  firstName: string;
  onSignout: () => Promise<void>;
}
