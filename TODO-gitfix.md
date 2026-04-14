# Git Submodule Fix - Remove broken 'als' submodule

## Steps (approved plan)
1. [x] git rm --cached als
2. [x] rmdir /s als (Remove-Item -Recurse -Force)
3. [x] git commit -m \"Remove broken 'als' submodule (fixes gitmodules URL error)\"
4. [x] Verify: git status (clean; branch ahead by 1)
5. [ ] Optional: git push origin main

**Status**: Starting step 1.
