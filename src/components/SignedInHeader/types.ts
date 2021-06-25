import { GroupName } from "../../context/auth/types";

export interface SignedInHeaderProps {
  groups: GroupName[];
  onSignout: () => Promise<void>;
}
