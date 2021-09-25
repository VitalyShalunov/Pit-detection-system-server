import { IsString, } from 'class-validator';

class CreatePitDto {
  public coords: [number, number];
  
  @IsString()
  public description: string;

  public images: string[];

  public category: number;
}

export default CreatePitDto;
