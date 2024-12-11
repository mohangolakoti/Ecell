import * as XLSX from 'xlsx';

export const exportToExcel = (data: any[], filename: string) => {
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, `${filename}.xlsx`);
};

export const formatTeamData = (teams: any[]) => {
  return teams.map(team => ({
    'Team Name': team.teamName,
    'Registration Date': new Date(team.registrationDate).toLocaleDateString(),
    'Team Size': team.members.length,
    'Members': team.members.map((m: any) => m.name).join(', '),
    'Departments': team.members.map((m: any) => m.department).join(', '),
    'Email Addresses': team.members.map((m: any) => m.email).join(', '),
    'Phone Numbers': team.members.map((m: any) => m.phone).join(', '),
    'Status': team.status
  }));
};