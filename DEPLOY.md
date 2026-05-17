# 배포 준비 안내

이 앱은 정적 파일만으로 동작하고, GitHub Actions가 YouTube RSS를 매일 읽어 `videos.js`를 자동 갱신합니다.

## GitHub에 올릴 파일

`deploy-ready` 폴더 안의 파일과 폴더를 새 GitHub 저장소 루트에 그대로 올리면 됩니다.

## GitHub Pages 설정

1. GitHub 저장소 `Settings`로 이동합니다.
2. `Pages` 메뉴에서 `Deploy from a branch`를 선택합니다.
3. 브랜치는 `main`, 폴더는 `/ (root)`를 선택합니다.
4. 저장 후 표시되는 Pages 주소로 앱을 확인합니다.

## 자동 갱신 권한 설정

1. 저장소 `Settings`로 이동합니다.
2. `Actions` > `General`로 이동합니다.
3. `Workflow permissions`를 `Read and write permissions`로 바꿉니다.
4. 저장합니다.

## 수동 갱신 테스트

1. 저장소 `Actions` 탭으로 이동합니다.
2. `Update YouTube Videos` 워크플로를 선택합니다.
3. `Run workflow`를 누릅니다.

정상 실행되면 새 영상이 있을 때 `videos.js`가 자동 커밋됩니다.
