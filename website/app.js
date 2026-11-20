'use strict';

// 미리보기 원격 모드 토글 (실제 시스템 설정 변경 없음)
const quickToggle = document.getElementById('quick-toggle');
const quickDemo = document.getElementById('quick-demo');
const quickState = document.getElementById('quick-state');
const quickSub = document.getElementById('quick-sub');

if (quickToggle && quickDemo && quickState && quickSub) {
  quickToggle.addEventListener('click', () => {
    const isOn = quickToggle.getAttribute('aria-checked') !== 'true';
    quickToggle.setAttribute('aria-checked', String(isOn));
    quickDemo.classList.toggle('is-off', !isOn);

    quickState.replaceChildren();
    const dot = document.createElement('span');
    dot.className = 'live-dot';
    dot.setAttribute('aria-hidden', 'true');
    quickState.append(dot, isOn ? '원격 모드 켜짐' : '원격 모드 꺼짐');

    quickSub.textContent = isOn
      ? '시스템 잠자기 방지 적용 · 이전 전원 설정 백업됨'
      : '변경한 전원 설정이 이전 값으로 복원되었습니다';
  });
}

// 터미널 한 줄 설치 명령어 복사
const copyBtn = document.getElementById('copy-install-cmd');
const copyFeedback = document.getElementById('copy-feedback');
const installCommand = document.getElementById('install-command');

if (copyBtn && copyFeedback && installCommand) {
  let resetTimer = null;

  copyBtn.addEventListener('click', async () => {
    const commandText = installCommand.textContent.trim();
    if (resetTimer) {
      window.clearTimeout(resetTimer);
    }

    try {
      await navigator.clipboard.writeText(commandText);
      copyBtn.textContent = '복사됨';
      copyFeedback.textContent = '클립보드에 복사되었습니다. 터미널에 붙여넣어 실행하세요.';
    } catch {
      copyFeedback.textContent = '자동 복사에 실패했습니다. 명령어를 직접 선택해 복사해 주세요.';
    }

    resetTimer = window.setTimeout(() => {
      copyBtn.textContent = '복사';
      copyFeedback.textContent = '';
    }, 2800);
  });
}
