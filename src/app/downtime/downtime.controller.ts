import { Controller, Post, HttpStatus, Body } from '@nestjs/common';
import { DowntimeService } from './downtime.service';
import { ApiBearerAuth, ApiUseTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GetDowntimeDto } from './dto/downtime.dto';
import { Downtime } from './downtime.entity';
import { Utils } from '@app/shared/utils';
import { DowntimeCmd } from './cmd/downtime.command';
import { DowntimeRequestCmd } from './cmd/downtime-request.command';

@ApiUseTags('downtime')
@ApiBearerAuth()
@Controller('api/v1/downtime')
export class DowntimeController {
  constructor(private readonly downtimeService: DowntimeService
    ) {}

  @Post()
  @ApiOperation({ title: 'Post Downtime', description: 'Save downtime.' })
  @ApiResponse({ description: 'Success!', status: HttpStatus.OK, type: GetDowntimeDto })
  @ApiResponse({ description: 'Bad request.', status: HttpStatus.BAD_REQUEST })
  public async post(@Body() req: DowntimeRequestCmd): Promise<any> {

    let process = await this.downtimeService.create(new Downtime(req));

    if (!process) {
        return Utils.sendResponseSaveFailed("Downtime")
    }

    return process;
  }
}