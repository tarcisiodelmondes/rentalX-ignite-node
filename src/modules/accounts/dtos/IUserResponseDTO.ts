export class IUserResponseDTO {
  name: string;
  email: string;
  driver_license: string;
  id: string;
  avatar: string;
  avatar_url: () => string;
}
