import { ApiModelProperty } from '@nestjs/swagger';
import { Machine } from '@app/app/machine/machine.entity';
import { DowntimeCategory } from '@app/app/downtime-category/downtime-category.entity';
import { DowntimeReason } from '@app/app/downtime-reason/downtime-reason.entity';
import { IDowntime } from '../interface/downtime.interface';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';

export class GetDowntimeDto {
  constructor(data: IDowntime) {
    this.id = data.id;
    this.duration = data.duration;
    
    this.rencana_produksi = data.rencana_produksi;
    this.machine = data.machine;
    this.downtime_category = data.downtime_category;
    this.downtime_reason = data.downtime_reason;
  }

  @ApiModelProperty() id: number;
  @ApiModelProperty() duration: number;
  
  @ApiModelProperty() created_at: string;
  @ApiModelProperty() updated_at: string;
  @ApiModelProperty() deleted_at: string;

  @ApiModelProperty() rencana_produksi: RencanaProduksi;
  @ApiModelProperty() machine: Machine;
  @ApiModelProperty() downtime_category: DowntimeCategory;
  @ApiModelProperty() downtime_reason: DowntimeReason;
}
