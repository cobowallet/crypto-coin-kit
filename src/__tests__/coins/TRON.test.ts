import {ResourceType} from './../../TRON/index';
import {signWithPrivateKey} from '../../ETH/signProvider';
import {TRON, TxData} from '../../TRON';

const privKey =
  '89e76e48948a088d32208005b90c7795b418b74eb77323050391a9289bf9d293';
const pubKey =
  '03b2680ba21d4bd9771181f77e821816a2bd095e076dc28ff57ff12a74390de5f8';

const txData: TxData = {
  token: 'TRX',
  from: 'TTiYGxb7YNfUQJAnLFMd1pvmoywM7PxiG2',
  to: 'TXhtYr8nmgiSp3dY3cSfiKBjed3zN8teHS',
  value: '2000000',
  fee: 100000,
  latestBlock: {
    hash: '36f6939bb2fa89e8ec27b63954f5913d143d2fa18f9bd93ebcb57055ecb2057c',
    number: 16016988,
    timestamp: 1578306207000,
  },
};
const txDataTRC10: TxData = {
  to: 'TKCsXtfKfH2d6aEaQCctybDC9uaA3MSj2h',
  from: 'TXhtYr8nmgiSp3dY3cSfiKBjed3zN8teHS',
  value: '1',
  memo: '',
  fee: 100000,
  latestBlock: {
    hash: '6886a76fcae677e3543e546a43ad4e5fc6920653b56b713542e0bf64e0ff85ce',
    number: 16068126,
    timestamp: 1578459699000,
  },
  token: '1001090',
  override: {
    tokenShortName: 'TONE',
    tokenFullName: 'TronOne',
    decimals: 0,
  },
};

const txDataTRC20: TxData = {
  contractAddress: 'TBAo7PNyKo94YWUq1Cs2LBFxkhTphnAE4T',
  to: 'TQAg2T2vJcHAX9sbKTEoaoWzt512yUjiFD',
  from: 'TUAhxw3MgMyR9rhyrMDnVJbo3bky1GSUrH',
  value: '1000000',
  fee: 1,
  latestBlock: {
    hash: '315f1ee0e082a1dae1b9de559665c6714f3b8667f69cd5e44466ba6e34d37aef',
    number: 1936,
    timestamp: 1527682440000,
  },
};

const txDataTRC20_1: TxData = {
  contractAddress: 'TBAo7PNyKo94YWUq1Cs2LBFxkhTphnAE4T',
  to: 'TQAg2T2vJcHAX9sbKTEoaoWzt512yUjiFD',
  from: 'TUAhxw3MgMyR9rhyrMDnVJbo3bky1GSUrH',
  value: '3000000000000000000000',
  fee: 1,
  latestBlock: {
    hash: '315f1ee0e082a1dae1b9de559665c6714f3b8667f69cd5e44466ba6e34d37aef',
    number: 1936,
    timestamp: 1527682440000,
  },
};

describe('coin.TRON', () => {
  const tron = new TRON();
  it('should generate right address', () => {
    const address = tron.generateAddress(pubKey);
    expect(address).toBe('TTiYGxb7YNfUQJAnLFMd1pvmoywM7PxiG2');
  });

  it('should generate valid address', () => {
    expect(tron.isAddressValid('TTiYGxb7YNfUQJAnLFMd1pvmoywM7PxiG2')).toBe(
      true,
    );
    expect(tron.isAddressValid('TTiYGxb7YNfUQJAnLFMd1pvmoywM7PxiGH')).toBe(
      false,
    );
    expect(tron.isAddressValid('3EwY1PaQ5fB4M4nvWRYgUn2LNmokeJ36Pj')).toBe(
      false,
    );
  });

  // curl -X POST --data '{"transaction":"0a7e0a02665c2208ec27b63954f5913d40f8a198d3f72d5a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a1541c2ac1d2a29ea27b9bbf049370c3505139c7c9d90121541ee6d1ffba872573971562a70f9ad1dc2d4af8c8b1880897a12411a1d35a2c6a114242a6ebf9e656c8606bf047c6f8cbafb983e7d2efc8adbee9678eb172e1b24668ca755c0eaf4e340b9ab158da2702d4b620d4c919d5cedbe9c01"}' https://apilist.tronscan.org/api/broadcast
  // {"code":"SUCCESS","success":true,"message":"","transaction":""}
  // https://tronscan.org/#/transaction/9451437c0f306c0eaf73d54b9584aeaac6dc7d83672bfc192596bfed4f94a282
  it('should generate signed tx', async () => {
    const tx = await tron.generateTransaction(
      txData,
      signWithPrivateKey(privKey),
    );
    expect(tx.txId).toBe(
      'c918f1371862b495ee186d27470380bddd3b049cebd226abc6e4bed825cef95a',
    );
    expect(tx.txHex).toBe(
      '0a7e0a02665c2208ec27b63954f5913d40d887bdd4f72d5a67080112630a2d747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e73666572436f6e747261637412320a1541c2ac1d2a29ea27b9bbf049370c3505139c7c9d90121541ee6d1ffba872573971562a70f9ad1dc2d4af8c8b1880897a1241d8f8fc38b1b07de1b5b17550244dc9c1e7b9e3b840d68d2592f159a7ab0e444370c873153162ffb6f0068d42a32f2e1cb84202b0a90038e455c8aab0ffd284fe01',
    );
  });

  // curl -X POST --data '{"transaction":"0a8a010a022e1e2208543e546a43ad4e5f4098d6b09cf82d5a730802126f0a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e736665724173736574436f6e747261637412390a0731303031303930121541ee6d1ffba872573971562a70f9ad1dc2d4af8c8b1a1541654eb440c1a0640aca337ad9ebf3a122976a910520011241af78b81230901b89ca74506a9680b4ac1e533817a87e9cede87c597bbb97f5e4da9ab6438b1c7cbec762ab165d5e7c7f7f4f0fb97df23570ad4b047a0e67894b01"}' https://apilist.tronscan.org/api/broadcast
  // {"code":"SUCCESS","success":true,"message":"","transaction":""}
  // https://tronscan.org/#/transaction/07ceaad1c4145723392b36fe0ec3bea5fd2985583b6e93ef212f6063b08ea301
  it('should generate signed TRC10 token', async () => {
    const tx = await tron.generateTransaction(
      txDataTRC10,
      signWithPrivateKey(
        '965cecde62f3c448a6bae0c3ce0c16267069eb0aae9f5390af8182eaee60bf47',
      ),
    );
    expect(tx.txId).toBe(
      'd636f8eaef70a19ff4d4d4c71bb0c7ea863065be5ccd9e14342aa55fb35d4a23',
    );
    expect(tx.txHex).toBe(
      '0a8a010a022e1e2208543e546a43ad4e5f40f8bbd59df82d5a730802126f0a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e5472616e736665724173736574436f6e747261637412390a0731303031303930121541ee6d1ffba872573971562a70f9ad1dc2d4af8c8b1a1541654eb440c1a0640aca337ad9ebf3a122976a910520011241d14d8afa7c6ba86f2939a4a859731ead64f6bd2a541fc8306504f7125222a1856b6b5e7cfb3b18868bfed62699e2fc33624a3429f867d957a8f40aba43b85fbb01',
    );
  });
  it('should generate signed TRC20 token', async () => {
    const tx = await tron.generateTransaction(
      txDataTRC20,
      signWithPrivateKey(
        '986e593a779463e5d15fba95939f22d48736ccac90d4d451942cdc1047757f06',
      ),
    );
    expect(tx.txHex).toBe(
      '0ad4010a0207902208e1b9de559665c6714080c49789bb2c5aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541c79f045e4d48ad8dae00e6a6714dae1e000adfcd1215410d292c98a5eca06c2085fff993996423cf66c93b2244a9059cbb0000000000000000000000009bbce520d984c3b95ad10cb4e32a9294e6338da300000000000000000000000000000000000000000000000000000000000f424070c0b6e087bb2c90018094ebdc031241549501a7967a6d023b9dca4da164fa73b4da29b8583e8963ee4fff1f7703ac4156abf2836f562ea9b6e1257bce7364076a3cd69cd459da8c8abe96180f9c566f01',
    );
  });

  it('should generate signed large amount TRC20 token', async () => {
    const tx = await tron.generateTransaction(
        txDataTRC20_1,
        signWithPrivateKey(
            '986e593a779463e5d15fba95939f22d48736ccac90d4d451942cdc1047757f06',
        ),
    );
    expect(tx.txHex).toBe(
        '0ad4010a0207902208e1b9de559665c6714080c49789bb2c5aae01081f12a9010a31747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e54726967676572536d617274436f6e747261637412740a1541c79f045e4d48ad8dae00e6a6714dae1e000adfcd1215410d292c98a5eca06c2085fff993996423cf66c93b2244a9059cbb0000000000000000000000009bbce520d984c3b95ad10cb4e32a9294e6338da30000000000000000000000000000000000000000000000a2a15d09519be0000070c0b6e087bb2c90018094ebdc03124186888c5ab8d0f8d96090703f85069caea61ac13cf71c5ff7d04727a1ab0fb2ba73924a5902b58b82c9195cc1e1ce7697dbc15df74d7e947d49f98ff831c52e9d00',
    );
  });

  it('should sign message', async () => {
    expect(await tron.signMessage('hello', signWithPrivateKey(privKey))).toBe(
      '7f99c6d07404346ec0094a5790fe631c8145a3a6203708ef2d1b984c35eb38b2cc74a50273dc1007728fb49e1d2923f1684594e94abbd4ed1c77afdb45114b5600',
    );
  });

  // curl -X POST --data '{"transaction":"0af7020a02fa692208a9fcd49cae8a7fc340f8aef3b0ab2e5adf02080412da020a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e566f74655769746e657373436f6e747261637412a5020a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf612190a15414ac0706a3d08c0416ad361878b05d6fc8d36863e100e12190a15412d7bdb9846499a2e5e6c5a7e6fb05731c83107c7100612190a15414a193c92cd631c1911b99ca964da8fd342f4cddd100312190a15414d1ef8673f916debb7e2515a8f3ecaf2611034aa100a12190a1541530f931037de0c369968a5cf622003d240ef96e2100a12190a15415863f6091b8e71766da808b1dd3159790f61de7d100512190a154178c842ee63b253f8f0d2955bbc582c661a078c9d100212190a1541c2de79fc11be35c35e5148bd2e45d0633f641ac8100312190a1541d25855804e4e65de904faf3ac74b0bdfc53fac76100a12190a1541e40302d6b5e889bfbd395ed884638d7f03ee3f87100112416dbac65bf7760f606a000a65a31ac68414fc1b1e4efa3f32fc23719d021d9cefa14d97e9c7de8143aa8e0af13b643e9c4aeb89a89932ca88a270c6242222c1db01"}' https://apilist.tronscan.org/api/broadcast
  // {"code":"SUCCESS","success":true,"message":"","transaction":""}
  // https://tronscan.org/#/transaction/007cbcf2722a758b023d07bc171d5a93ce223a883909d50f7771ca5d63592835
  it('should sign vote', async () => {
    const params = {
      address: 'TATrhRLpi65bMe8WwKCYAPjRAAoc3QWgR3',
      votes: {
        TGnTYAB6XjLWoAGYXmDoLeLeX9X59JFBVK: 14,
        TE7hnUtWRRBz3SkFrX8JESWUmEvxxAhoPt: 6,
        TGj1Ej1qRzL9feLTLhjwgxXF4Ct6GTWg2U: 3,
        TGzz8gjYiYRqpfmDwnLxfgPuLVNmpCswVp: 10,
        THYPk7Z72REsPrHtZkcwp9pWJadsPxp1UP: 10,
        TJ2aDMgeipmoZRuUEru2ri8t7TGkxnm6qY: 5,
        TLyqzVGLV1srkB7dToTAEqgDSfPtXRJZYH: 2,
        TTjacDH5PL8hpWirqU7HQQNZDyF723PuCg: 3,
        TV9QitxEJ3pdiAUAfJ2QuPxLKp9qTTR3og: 10,
        TWkpg1ZQ4fTv7sj41zBUTMo1kuJEUWTere: 1,
      },
      latestBlock: {
        hash:
          'f6c5ba9acc258fa8a9fcd49cae8a7fc361a3d848a499e49b6e5bdd3e5809dd2a',
        number: 20642409,
        timestamp: 1592192943000,
      },
      privateKey:
        '87a88aff2fd0ea09f9d63c379a821f317c0e170d9a557296807d1922f81a2850',
    };
    const tx = await tron.vote(
      {
        address: params.address,
        votes: params.votes,
        latestBlock: params.latestBlock,
      },
      signWithPrivateKey(params.privateKey),
    );
    expect(tx.txHex).toBe(
      '0af7020a02fa692208a9fcd49cae8a7fc340d89498b2ab2e5adf02080412da020a30747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e566f74655769746e657373436f6e747261637412a5020a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf612190a15414ac0706a3d08c0416ad361878b05d6fc8d36863e100e12190a15412d7bdb9846499a2e5e6c5a7e6fb05731c83107c7100612190a15414a193c92cd631c1911b99ca964da8fd342f4cddd100312190a15414d1ef8673f916debb7e2515a8f3ecaf2611034aa100a12190a1541530f931037de0c369968a5cf622003d240ef96e2100a12190a15415863f6091b8e71766da808b1dd3159790f61de7d100512190a154178c842ee63b253f8f0d2955bbc582c661a078c9d100212190a1541c2de79fc11be35c35e5148bd2e45d0633f641ac8100312190a1541d25855804e4e65de904faf3ac74b0bdfc53fac76100a12190a1541e40302d6b5e889bfbd395ed884638d7f03ee3f8710011241222eceb604a9e88b564fb42aef4cf6fd31fa9d3debb8df71281cba3e43a563fbf61fbe033972cd824f9c1720519800406201d3cc1ba6e385a8383a24cfa61cd601',
    );
  });

  // curl -X POST --data '{"transaction":"0a6a0a0234df22089f02fd52839049064098e9a8c6ab2e5a53080d124f0a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e576974686472617742616c616e6365436f6e747261637412170a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf61241e14a9cc04f3313d09ca585f85df90f98818c7c6e98d5bb9580327fe118db321a5867fd3adf53cbb60fcf33eee455bb906dd1950b3f25663727459ff2ce32957a00"}' https://apilist.tronscan.org/api/broadcast
  // {"code":"SUCCESS","success":true,"message":"","transaction":""}
  // https://tronscan.org/#/transaction/93bd3e6c951201b88bf41a2669fffecf8db9beedd3ba07f791da09b721866658
  it('should sign withdrawReward', async () => {
    const params = {
      address: 'TATrhRLpi65bMe8WwKCYAPjRAAoc3QWgR3',
      latestBlock: {
        hash:
          'd3049042bed284589f02fd528390490656d43acb33f1bb8e0d27e537d4808f70',
        number: 20657375,
        timestamp: 1592237859000,
      },
      privateKey:
        '87a88aff2fd0ea09f9d63c379a821f317c0e170d9a557296807d1922f81a2850',
    };
    const tx = await tron.withdrawReward(
      {
        address: params.address,
        latestBlock: params.latestBlock,
      },
      signWithPrivateKey(params.privateKey),
    );
    expect(tx.txHex).toBe(
      '0a6a0a0234df22089f02fd528390490640f8cecdc7ab2e5a53080d124f0a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e576974686472617742616c616e6365436f6e747261637412170a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf61240c34f4a14e50b2bdf08824d5ebc100b86bf7aaade20dfc9b618b63b1d6273fd94eca6402f883cae128f97c29d7b4e2fd9ba7aced4205b1b81f25ca43545681e20',
    );
  });

  it('should convert correct address', async () => {
    const address = 'TATrhRLpi65bMe8WwKCYAPjRAAoc3QWgR3';

    const TRONAddress = tron.convertAddress(address);

    expect(TRONAddress).toBe('41056b1d26c3422e391a50b497f6d1f5aa0efd7cf6');
  });

  // curl -X POST --data '{"transaction":"0a700a0278d322083472ea616cd95e8a4088abcbf8ad2e5a59080b12550a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e467265657a6542616c616e6365436f6e7472616374121f0a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf610c0843d180350011241349a22334eab0c1dcd2494747288240038181b2f5985fec91884bd9ffad79c052c0b000ca45c5b1ffaa73a21b612fa9c965ad48859db39029a242b201449f2c701"}' https://apilist.tronscan.org/api/broadcast
  // {"code":"SUCCESS","success":true,"message":"","transaction":""}
  // https://tronscan.org/#/transaction/635542ecb1fe92066496b63e0f91874ea027103e6bfbf027d695cb2ae7fb63f0
  it('should build correct freeze balance tx', async () => {
    const params = {
      address: 'TATrhRLpi65bMe8WwKCYAPjRAAoc3QWgR3',
      amount: 1000000,
      resourceType: ResourceType.ENERGY,
      latestBlock: {
        hash:
          '3b8251ef62eba0c93472ea616cd95e8ae5aff66309cf1954a91dec9dea4a0386',
        number: 20871379,
        timestamp: 1592880153000,
      },
      privateKey:
        '87a88aff2fd0ea09f9d63c379a821f317c0e170d9a557296807d1922f81a2850',
    };

    const {txHex, txId} = await tron.freezeBalance(
      params,
      signWithPrivateKey(params.privateKey),
    );

    expect(txHex).toBe(
      '0a700a0278d322083472ea616cd95e8a40e890f0f9ad2e5a59080b12550a32747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e467265657a6542616c616e6365436f6e7472616374121f0a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf610c0843d1803500112419241cd613e632583c29ec946e353f0dfffcebf55f8e6349f6fd9aa6c33e431d0d3d6163c348a04fd024c337e98503e7857d109cb0d39a10aaa2d3171e1810c2a01',
    );
    expect(txId).toBe(
      '0a839e064cb2ec58d6d542f5718e7d6609f4839596cc54147bbd194e2a940120',
    );
  });

  // curl -X POST --data '{"transaction":"0a6a0a027884220830f1f771f610c93a40c0efbcf8ad2e5a53080c124f0a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e556e667265657a6542616c616e6365436f6e747261637412170a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf61241f2ccc71660008ec73cbf9427a1e988622f004a71a50d813ff7f106f878c1a070e9552991528636af6dc3f54fed14987ef79a9cc5b83be0ba89747d869e6bc4a701"}' https://apilist.tronscan.org/api/broadcast
  // {"code":"SUCCESS","success":true,"message":"","transaction":""}
  // https://tronscan.org/#/transaction/87048448cfa69ebb20ddb131df60d62c2b5e67bac4861f1b14b1d3017ca2cfb7
  it('should build correct unfreeze balance tx', async () => {
    const params = {
      address: 'TATrhRLpi65bMe8WwKCYAPjRAAoc3QWgR3',
      resourceType: ResourceType.NET,
      latestBlock: {
        hash:
          '8d1724e391d4825230f1f771f610c93aacf9dc5624480c128138ca3b56293c83',
        number: 20871300,
        timestamp: 1592879916000,
      },
      privateKey:
        '87a88aff2fd0ea09f9d63c379a821f317c0e170d9a557296807d1922f81a2850',
    };

    const {txHex, txId} = await tron.unFreezeBalance(
      params,
      signWithPrivateKey(params.privateKey),
    );
    expect(txHex).toBe(
      '0a6a0a027884220830f1f771f610c93a40a0d5e1f9ad2e5a53080c124f0a34747970652e676f6f676c65617069732e636f6d2f70726f746f636f6c2e556e667265657a6542616c616e6365436f6e747261637412170a1541056b1d26c3422e391a50b497f6d1f5aa0efd7cf61241fc1b63d70f4beede79b5d0847cb5c746e0796fcb12bb40c5504477e5fdd81846d681ad0e6b966a96f3db724e9b9b53258b8ec99a0082c2240c71220a0c6a228701',
    );
    expect(txId).toBe(
      '460fb45e5920e640027dbec920a72f5115f72a3fdf6424e9e495d3789f568c2f',
    );
  });
});
