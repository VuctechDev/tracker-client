import React from "react";
import { useGetOrganizationsBO } from "../../queries/organizations";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface Props {
  value: number | null;
  handleSelect: React.Dispatch<React.SetStateAction<null | number>>;
}

const OrganizationSelect: React.FC<Props> = ({ value, handleSelect }) => {
  const { data } = useGetOrganizationsBO();
  return (
    <FormControl required>
      <InputLabel>Organization</InputLabel>
      <Select
        value={value}
        onChange={(e) => {
          const value = e.target.value as string;
          handleSelect(parseInt(value));
        }}
      >
        {data?.data.map((org) => (
          <MenuItem key={org.id} value={org.id}>
            {org.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default OrganizationSelect;
