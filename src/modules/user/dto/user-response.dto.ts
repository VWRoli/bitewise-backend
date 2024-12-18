import { ApiProperty } from '@nestjs/swagger';
import { PersonalInformationDto } from './personal-information.dto';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ type: () => PersonalInformationDto })
  personalInformation: PersonalInformationDto;

  @ApiProperty({ example: null, nullable: true })
  googleId: string;

  @ApiProperty({ example: '2023-10-01T00:00:00.000Z' })
  createTimeStamp: Date;

  @ApiProperty({ example: '2023-10-01T00:00:00.000Z' })
  updateTimeStamp: Date;

  @ApiProperty({ example: null, nullable: true })
  deleteTimeStamp: Date | null;
}
