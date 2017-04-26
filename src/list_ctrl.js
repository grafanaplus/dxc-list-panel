import {PanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import './css/list-panel.css!';

// const panelDefaults = {
//   mode: 'time',
//   clockType: '24 hour',
//   offsetFromUtc: null,
//   offsetFromUtcMinutes: null,
//   bgColor: null,
//   countdownSettings: {
//     endCountdownTime: moment().seconds(0).milliseconds(0).add(1, 'day').toDate(),
//     endText: '00:00:00'
//   },
//   dateSettings: {
//     showDate: false,
//     dateFormat: 'YYYY-MM-DD',
//     fontSize: '20px',
//     fontWeight: 'normal'
//   },
//   timeSettings: {
//     customFormat: 'HH:mm:ss',
//     fontSize: '60px',
//     fontWeight: 'normal'
//   },
//   IS_ROW: false,
//   cards: [
//     {
//       color: 'rgb(126,117,222)',
//       title: '完成部署',
//       items: [
//         'A驻地完成部署',
//         'B驻地完成部署',
//         'C驻地完成部署',
//         'D驻地完成部署'
//       ]
//     },
//     {
//       color: 'rgb(234,208,89)',
//       title: '正在部署',
//       items: [
//         'E驻地正在部署',
//         'D驻地正在部署',
//         'D驻地正在部署'
//       ]
//     }
//   ]
// };
const panelDefaults = {
  IS_ROW: false,
  cards: [
    {
      color: 'rgb(126,117,222)',
      title: 'PLAN',
      items: [
        {value:'Have a meal'},
        {value:'Go to bed'},
        {value:'Back to the first'}
      ]
    }
  ]
};

export class ListCtrl extends PanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    _.defaultsDeep(this.panel, panelDefaults);

    this.events.on('init-edit-mode', this.onInitEditMode.bind(this));
    this.events.on('panel-teardown', this.onPanelTeardown.bind(this));
    this.events.on('panel-initialized', this.render.bind(this));

    // this.updateClock();
  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/grafana-list-panel/editor.html', 2);
  }

  onPanelTeardown() {
    this.$timeout.cancel(this.nextTickPromise);
  }

  // updateClock() {
  //   this.nextTickPromise = this.$timeout(this.updateClock.bind(this), 1000);
  // }

  addCard() {
    this.panel.cards.push({
      color: 'rgb(126,117,222)',
      title: 'PLAN',
      items: [
        {value:'Have a meal'},
        {value:'Go to bed'},
        {value:'Back to the first'}
      ]
    });
  }

  removeCard(card) {
    this.panel.cards = _.without(this.panel.cards, card);
  }

  addItem(index) {
    this.panel.cards[index].items.push({value:''});
  }

  removeItem(index,item) {
    this.panel.cards[index].items = _.without(this.panel.cards[index].items, item);
  }

  link(scope, elem) {
    this.events.on('render', () => {
      const $panelContainer = elem.find('.panel-container');
    });
  }
}

ListCtrl.templateUrl = 'module.html';
