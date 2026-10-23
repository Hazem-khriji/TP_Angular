import { Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [FormsModule],
  selector: 'app-ttc',
  styleUrl: './ttc.component.css',
  templateUrl: './ttc.component.html',
})
export class TtcComponent {
  prix = signal(0);
  quantite = signal(1);
  tva = signal(18);

  remise = computed(() => {
    const quantite = this.quantite();
    if (quantite > 15) return 0.3;
    if (quantite >= 10) return 0.2;
    return 0;
  });

  prixHT = computed(() => this.prix() * this.quantite() * (1 - this.remise()));
  prixTtc = computed(() => this.prixHT() * (1 + this.tva() / 100));
}
