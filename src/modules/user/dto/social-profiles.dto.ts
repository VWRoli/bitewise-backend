import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class SocialProfilesDto {
  @ApiProperty({
    example: 'https://www.facebook.com/username',
    description: "URL to the user's Facebook profile",
  })
  @IsString()
  @IsOptional()
  facebook: string;

  @ApiProperty({
    example: 'https://www.twitter.com/username',
    description: "URL to the user's Twitter profile",
  })
  @IsString()
  @IsOptional()
  twitter: string;

  @ApiProperty({
    example: 'https://www.linkedin.com/in/username',
    description: "URL to the user's LinkedIn profile",
  })
  @IsString()
  @IsOptional()
  linkedin: string;

  @ApiProperty({
    example: 'https://www.instagram.com/username',
    description: "URL to the user's Instagram profile",
  })
  @IsString()
  @IsOptional()
  instagram: string;
}
