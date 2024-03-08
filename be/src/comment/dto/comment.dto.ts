import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CommentFilterDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'Post Id',
  })
  @IsOptional()
  postId?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'User Id',
  })
  @IsOptional()
  userId?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Offset',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(0)
  offset?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Limit',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  limit?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Starting Id',
  })
  @IsOptional()
  @Transform(({ value }) => Number(value))
  @IsNumber()
  @Min(1)
  startingId?: number;
}

export class CreateCommentDto {
  @ApiPropertyOptional({
    type: Number,
    description: 'User Id',
  })
  @IsOptional()
  @IsNumber()
  user_id?: number;

  @ApiProperty({
    type: Number,
    description: 'Post Id',
  })
  @IsNumber()
  post_id: number;

  @ApiProperty({
    type: String,
    description: 'Content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class UpdateCommentDto {
  @ApiProperty({
    type: String,
    description: 'Content',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}
