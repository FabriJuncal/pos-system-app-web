export class ListRolesModel {
  total: number;
  roles: {
      data: RolModel[],
  }
}

export class RolModel {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}
