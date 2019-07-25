import { ApiModelProperty } from '@nestjs/swagger';
import { RencanaProduksi } from '@app/app/rencana-produksi/rencana-produksi.entity';
import { Machine } from '@app/app/machine/machine.entity';
import { DowntimeCategory } from '@app/app/downtime-category/downtime-category.entity';
import { DowntimeReason } from '@app/app/downtime-reason/downtime-reason.entity';

export class DowntimeCmd {
  @ApiModelProperty() duration: number;

  @ApiModelProperty() rencana_produksi: RencanaProduksi;
  @ApiModelProperty() machine: Machine;
  @ApiModelProperty() downtime_category : DowntimeCategory;
  @ApiModelProperty() downtime_reason : DowntimeReason;
}