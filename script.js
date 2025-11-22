/**
 * disc_roulette_tool - JavaScript
 * ================================
 * - 21コマ/20コマ目押しルーレット
 * - 103％機種選択ルーレット
 * - localStorage による機種リスト永続化
 */

document.addEventListener('DOMContentLoaded', () => {
  // ========================================
  // 要素の取得
  // ========================================

  // タブ
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');

  // 21コマルーレット
  const btnDisc21 = document.getElementById('btn-disc21');
  const resultBox21 = document.getElementById('result-disc21');

  // 20コマルーレット
  const btnDisc20 = document.getElementById('btn-disc20');
  const resultBox20 = document.getElementById('result-disc20');

  // 機種ルーレット
  const machineInput = document.getElementById('machine-input');
  const btnAddMachine = document.getElementById('btn-add-machine');
  const machineList = document.getElementById('machine-list');
  const emptyMessage = document.getElementById('empty-message');
  const btnMachineRoulette = document.getElementById('btn-machine-roulette');
  const machineResult = document.getElementById('machine-result');
  const resultMachineBox = document.getElementById('result-machine');

  // ========================================
  // タブ切り替え
  // ========================================
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tabId = btn.dataset.tab;

      // タブボタンのアクティブ状態を切り替え
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // タブコンテンツの表示を切り替え
      tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
          content.classList.add('active');
        }
      });
    });
  });

  // ========================================
  // 等確率乱数生成
  // ========================================

  /**
   * 1 から max までの整数をランダムに返す（等確率）
   * @param {number} max - 最大値
   * @returns {number}
   */
  function getRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
  }

  /**
   * 配列からランダムに1つ選ぶ（等確率）
   * @param {Array} array
   * @returns {*}
   */
  function getRandomElement(array) {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  // ========================================
  // ルーレットアニメーション
  // ========================================

  /**
   * ルーレットを回すアニメーション
   * @param {HTMLElement} leftEl - 左リール結果表示要素
   * @param {HTMLElement} rightEl - 右リール結果表示要素
   * @param {HTMLElement} resultBox - 結果ボックス
   * @param {number} max - コマ数
   */
  function spinRoulette(leftEl, rightEl, resultBox, max) {
    let count = 0;
    const duration = 1500; // 1.5秒
    const interval = 50; // 50msごとに更新
    const iterations = duration / interval;

    resultBox.classList.add('animating');

    const spin = setInterval(() => {
      leftEl.textContent = `上段 ${getRandomInt(max)}コマ目`;
      rightEl.textContent = `上段 ${getRandomInt(max)}コマ目`;
      count++;

      if (count >= iterations) {
        clearInterval(spin);
        // 最終結果
        const leftFinal = getRandomInt(max);
        const rightFinal = getRandomInt(max);
        leftEl.textContent = `上段 ${leftFinal}コマ目`;
        rightEl.textContent = `上段 ${rightFinal}コマ目`;
        resultBox.classList.remove('animating');
      }
    }, interval);
  }

  // ========================================
  // 21コマルーレット（画像のみ）
  // ========================================
  const leftImg21 = document.getElementById('left-21-img');
  const rightImg21 = document.getElementById('right-21-img');

  btnDisc21.addEventListener('click', () => {
    let count = 0;
    const duration = 1500;
    const interval = 50;
    const iterations = duration / interval;

    resultBox21.classList.add('animating');
    leftImg21.style.display = 'block';
    rightImg21.style.display = 'block';

    const spin = setInterval(() => {
      const leftNum = getRandomInt(21);
      const rightNum = getRandomInt(21);

      leftImg21.src = `ディスクアップ2　左リールデータ/左${leftNum}.png`;
      rightImg21.src = `ディスクアップ2　右リールデータ/右${rightNum}.png`;

      count++;

      if (count >= iterations) {
        clearInterval(spin);
        // 最終結果
        const leftFinal = getRandomInt(21);
        const rightFinal = getRandomInt(21);
        leftImg21.src = `ディスクアップ2　左リールデータ/左${leftFinal}.png`;
        rightImg21.src = `ディスクアップ2　右リールデータ/右${rightFinal}.png`;
        resultBox21.classList.remove('animating');
      }
    }, interval);
  });

  // ========================================
  // 20コマルーレット（画像のみ）
  // ========================================
  const leftImg20 = document.getElementById('left-20-img');
  const rightImg20 = document.getElementById('right-20-img');

  btnDisc20.addEventListener('click', () => {
    let count = 0;
    const duration = 1500;
    const interval = 50;
    const iterations = duration / interval;

    resultBox20.classList.add('animating');
    leftImg20.style.display = 'block';
    rightImg20.style.display = 'block';

    const spin = setInterval(() => {
      const leftNum = getRandomInt(20);
      const rightNum = getRandomInt(20);

      leftImg20.src = `ウルトラリミックス左リール個別データ/左${leftNum}.png`;
      rightImg20.src = `ウルトラリミックス右リール個別データ/右${rightNum}.png`;

      count++;

      if (count >= iterations) {
        clearInterval(spin);
        // 最終結果
        const leftFinal = getRandomInt(20);
        const rightFinal = getRandomInt(20);
        leftImg20.src = `ウルトラリミックス左リール個別データ/左${leftFinal}.png`;
        rightImg20.src = `ウルトラリミックス右リール個別データ/右${rightFinal}.png`;
        resultBox20.classList.remove('animating');
      }
    }, interval);
  });

  // ========================================
  // 機種リスト管理
  // ========================================

  const STORAGE_KEY = 'disc_roulette_machines';

  /**
   * localStorage から機種リストを読み込む
   * @returns {Array<{name: string, checked: boolean}>}
   */
  function loadMachines() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  /**
   * 機種リストを localStorage に保存
   * @param {Array} machines
   */
  function saveMachines(machines) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(machines));
  }

  /**
   * 機種リストをUIに描画
   */
  function renderMachines() {
    const machines = loadMachines();
    machineList.innerHTML = '';

    if (machines.length === 0) {
      emptyMessage.classList.remove('hidden');
    } else {
      emptyMessage.classList.add('hidden');

      machines.forEach((machine, index) => {
        const li = document.createElement('li');
        li.className = 'machine-item';

        li.innerHTML = `
          <input type="checkbox"
                 id="machine-${index}"
                 ${machine.checked ? 'checked' : ''}>
          <span class="machine-name">${escapeHtml(machine.name)}</span>
          <button class="btn btn-danger btn-small" data-index="${index}">削除</button>
        `;

        // チェックボックスの変更を監視
        const checkbox = li.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
          const machines = loadMachines();
          machines[index].checked = checkbox.checked;
          saveMachines(machines);
        });

        // 削除ボタン
        const deleteBtn = li.querySelector('.btn-danger');
        deleteBtn.addEventListener('click', () => {
          deleteMachine(index);
        });

        machineList.appendChild(li);
      });
    }
  }

  /**
   * 機種を追加
   * @param {string} name
   */
  function addMachine(name) {
    const trimmed = name.trim();
    if (!trimmed) {
      alert('機種名を入力してください');
      return;
    }

    const machines = loadMachines();
    machines.push({ name: trimmed, checked: false });
    saveMachines(machines);
    renderMachines();
    machineInput.value = '';
  }

  /**
   * 機種を削除
   * @param {number} index
   */
  function deleteMachine(index) {
    const machines = loadMachines();
    machines.splice(index, 1);
    saveMachines(machines);
    renderMachines();
  }

  /**
   * HTMLエスケープ
   * @param {string} str
   * @returns {string}
   */
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // 機種追加ボタン
  btnAddMachine.addEventListener('click', () => {
    addMachine(machineInput.value);
  });

  // Enterキーでも追加
  machineInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addMachine(machineInput.value);
    }
  });

  // 初期描画
  renderMachines();

  // ========================================
  // リール配列表示（ウルトラリミックス）
  // ========================================
  const btnShowReel = document.getElementById('btn-show-reel');
  const btnCloseReel = document.getElementById('btn-close-reel');
  const reelImages = document.getElementById('reel-images');

  if (btnShowReel) {
    btnShowReel.addEventListener('click', () => {
      reelImages.classList.add('show');
    });
  }

  if (btnCloseReel) {
    btnCloseReel.addEventListener('click', () => {
      reelImages.classList.remove('show');
    });
  }

  // ========================================
  // リール配列表示（ディスクアップ2）
  // ========================================
  const btnShowReel21 = document.getElementById('btn-show-reel-21');
  const btnCloseReel21 = document.getElementById('btn-close-reel-21');
  const reelImages21 = document.getElementById('reel-images-21');

  if (btnShowReel21) {
    btnShowReel21.addEventListener('click', () => {
      reelImages21.classList.add('show');
    });
  }

  if (btnCloseReel21) {
    btnCloseReel21.addEventListener('click', () => {
      reelImages21.classList.remove('show');
    });
  }

  // ========================================
  // 機種ルーレット
  // ========================================
  btnMachineRoulette.addEventListener('click', () => {
    const machines = loadMachines();
    const checkedMachines = machines.filter(m => m.checked);

    if (checkedMachines.length === 0) {
      alert('少なくとも1機種は選択してください');
      return;
    }

    // アニメーション
    let count = 0;
    const duration = 2000; // 2秒
    const interval = 80;
    const iterations = duration / interval;

    resultMachineBox.classList.add('animating');

    const spin = setInterval(() => {
      const random = getRandomElement(checkedMachines);
      machineResult.textContent = random.name;
      count++;

      if (count >= iterations) {
        clearInterval(spin);
        // 最終結果
        const finalMachine = getRandomElement(checkedMachines);
        machineResult.textContent = finalMachine.name;
        resultMachineBox.classList.remove('animating');
      }
    }, interval);
  });
});
