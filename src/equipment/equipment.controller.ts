import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
// import { EquipmentService } from './equipment.service';
import { CreateEquipmentDto } from './application/dto/create-equipment.dto';
import { UpdateEquipmentDto } from './application/dto/update-equipment.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import { UploadEquipmentImageUseCase } from './application/usecases/upload-equipment-image.usecase';
import { Readable } from 'stream';
import { CreateEquipmentUseCase } from './application/usecases/create-equipment.usecase';

@Controller('equipment')
export class EquipmentController {
  constructor(
    private readonly createEquipmentUseCase: CreateEquipmentUseCase,
    private readonly uploadEquipmentImageUseCase: UploadEquipmentImageUseCase,
  ) { }

  @Post()
  create(@Body() createEquipmentDto: CreateEquipmentDto) {
    return this.createEquipmentUseCase.run(createEquipmentDto)
  }

  // @Get()
  // findAll() {
  //   return this.equipmentService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.equipmentService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEquipmentDto: UpdateEquipmentDto) {
  //   return this.equipmentService.update(+id, updateEquipmentDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.equipmentService.remove(+id);
  // }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @UploadedFile(new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'image/jpeg' })
      ]
    })) file: Express.Multer.File) {
    const readable = Readable.from(file.buffer);
    return this.uploadEquipmentImageUseCase.run(readable, uuid() + ".jpeg");
  }
}
