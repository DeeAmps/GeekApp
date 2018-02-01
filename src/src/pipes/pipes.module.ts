import { NgModule } from '@angular/core';
import { PokePipe } from './poke/poke';
import { OrderByPipe } from './order-by/order-by';
@NgModule({
	declarations: [PokePipe,
    OrderByPipe],
	imports: [],
	exports: [PokePipe,
    OrderByPipe]
})
export class PipesModule {}
