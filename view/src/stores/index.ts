import actions from './actions';
import mutations from './mutations';
import getters from './getters';
import { createStore } from 'vuex';
import { ref } from 'vue';

const store = createStore({
  state() {
    return {
      spinner: ref(false) as unknown as boolean,
      currency: ['USD', 'Euro'],
      container_type: ['40 ft Refer', '40 ft Dry HC', '40 ft Dry', '20 ft Dry', , '20 ft Refer', 'By Air', 'By Air/SEA mix', 'LCL by Sea'],
      payment_terms: [
        '20% Adv -80% BL scan',
        '100 % Against BL',
        '100% Advance',
        '30% Adv -70% BL scan',
        '30% Adv - 70% before loading',
        '50% Adv - 50% before loading',
        '60% Adv - 40% before loading',
        '100% after goods receipt'
      ],
      invoicing_party: ['Direct', 'Triangulos Esbeltos', 'Pinasz importacao e exportacao Lda'],
      loading_port: [
        'Alesund',
        'PECEM',
        'GAZIANTEP',
        'Itajai',
        'GEBZE / MERSIN',
        'Surabaya',
        'Belawan',
        'Port Klang',
        'Lisbon',
        'Izmit',
        'Jakarta',
        'Parawang',
        'Leixoes',
        'GDANSK POLAND',
        'Belgium',
        'Istanbul',
        'BUSAN',
        'Brussels',
        'Perawang',
        'Antwerp',
        'Itapoa,Brazil',
        'Tunisa',
        'Jebel Ali',
        'Libreville',
        'Singapore'
      ],
      destination_port: ['Luanda', 'Matadi', 'Walvis Bay', 'Cabinda', 'Dar Es sallam', 'Pointe Noire', 'Kinshasha', 'Lobito'],
      final_destination: ['Kinshasha', 'Matadi', 'Luanda', 'Cabinda', 'Lubumbashi', 'Lobito'],
      inspection: ['NO', 'BIVAC'],
      consignee: [
        'ETS MK PRINCIPE BIBLIQUE',
        'ETS KAZA',
        'STE BISO NA BISO SARL',
        'Prince Pharma Congo',
        'Noble Group SA',
        'Zeepack Angola Lda',
        'MBUYA BATUBENGA ALBERT',
        'Newaco Grupo.SA',
        'ESTRELA COLD ANGOLA, (SU) LDA',
        'ETS Minda',
        'NKOSO MBUMBA ORNELLA',
        'ETS DISPROCHIM',
        'CATO INTERNATIONAL',
        'Future Group SA'
      ]
    };
  },
  mutations,
  actions,
  getters
});

export default store;
