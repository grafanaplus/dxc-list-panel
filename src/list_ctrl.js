import {PanelCtrl} from 'app/plugins/sdk';
import _ from 'lodash';
import './css/list-panel.css!';

const panelDefaults = {
  IS_ROW: false,
  cards: [
    {
      color: 'rgb(126,117,222)',
      type: 'decimal',
      title: 'PLAN',
      items: []
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

  }

  onInitEditMode() {
    this.addEditorTab('Options', 'public/plugins/grafana-list-panel/editor.html', 2);
  }

  onPanelTeardown() {
    this.$timeout.cancel(this.nextTickPromise);
  }

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
