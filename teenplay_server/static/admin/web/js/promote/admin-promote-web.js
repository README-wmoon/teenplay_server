let page = 1
let category = ""
let keyword = ""
let type = ""

const CreateService = (() => {
    const showList = (pagination) => {
        let text = ``;
        pagination.club_post.forEach((page) => {

            text += `
                <li class="main-user-list" data-id="${page.id}">
                    <div class="main-user-list-check">
                        <input type="checkbox" class="main-comment-list-checkbox" id="checkbox" data-id="${page.id}" />
                    </div>
                    <div class="main-user-list-name">${page.club_name}</div>
                    <div id="title${page.id}" class="main-user-list-date">${page.post_title}</div>
                    <div class="main-user-list-status">${page.created_date.slice(0,10)}</div>
                    <div class="main-user-list-pay">${page.club_reply_count}</div>
                    <div class="main-user-list-comment">${page.view_count}</div>
                    <div class="main-user-list-detail">
                        <button class="member-user-list-detail-button toggle-button" data-id="${page.id}">상세보기</button>
                    </div>
                    <input type="hidden" id="post-content${page.id}" value="${page.post_content}">
                    <input type="hidden" id="image-path${page.id}" value="/upload/${page.image_path}">
                    <input type="hidden" id="club-post-category${page.id}" value="${page.club_post_category}">
                </li>
            `;
        })
        return text;
    }

    const showPaging = (pagination) => {
        let text = ``;
        // 시작 페이지가 1보다 큰 경우
        if (pagination.start_page > 1) {
            // 정렬이 popular이라면
            if (pagination.order === 'popular'){
                // 추가
                text += `
                    <li>
                        <a href="${pagination.start_page -1} popular" class="reft main-user-bottom-left">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="main-user-bottom-svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.58 3.27c.504.405.563 1.115.13 1.587L9.168 12l6.543 7.143a1.076 1.076 0 0 1-.13 1.586 1.26 1.26 0 0 1-1.695-.122L6 12l7.885-8.607a1.26 1.26 0 0 1 1.695-.122Z"></path>
                            </svg>
                        </a>
                    </li>
                 `
            } else {
                text += `
                    <li>
                        <a href="${pagination.start_page -1}" class="reft main-user-bottom-left">
                            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="main-user-bottom-svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.58 3.27c.504.405.563 1.115.13 1.587L9.168 12l6.543 7.143a1.076 1.076 0 0 1-.13 1.586 1.26 1.26 0 0 1-1.695-.122L6 12l7.885-8.607a1.26 1.26 0 0 1 1.695-.122Z"></path>
                            </svg>
                        </a>
                    </li>
                 `
            }
        }

        // i가 0에서 시작; page_count 보다 작을 때까지 반복; i를 1씩 증가;
        for (let i = 0; i < pagination.page_count; i++) {
            // 현재 반복 횟수 + 시작 페이지 <= 진짜 끝나는 페이지 이하라면
            if (i + pagination.start_page <= pagination.real_end) {
                // 선택된 페이지
                // 페이지가 현재 반복 횟수 + 시작 페이지와 같다면
                if (page === i + pagination.start_page) {
                    // 추가
                    text += `
                        <li class="main-margin">
                            <a href="javascript:void(0)" class="pagination main-user-bottom add-color">
                                <span class="main-user-number add-text-color">${i + pagination.start_page}</span>
                            </a>
                        </li>
                    `
                // 같지 않다면
                } else {
                    // 정렬이 popular 와 같다면
                    if (pagination.order === 'popular') {
                        // 추가
                        text += `
                            <li class="main-margin">
                                <a href="${i + pagination.start_page} popular" class="pagination main-user-bottom" aria-label="page number button">
                                    <span class="main-user-number">${i + pagination.start_page}</span>
                                </a>
                            </li>
                        `
                    // 아니라면
                    } else {
                        // 추가
                        text += `
                            <li class="main-margin">
                                <a href="${i + pagination.start_page}" class="pagination main-user-bottom" aria-label="page number button">
                                    <span class="main-user-number">${i + pagination.start_page}</span>
                                </a>
                            </li>
                        `
                    }
                }
            }
        }

        if (pagination.end_page < pagination.real_end) {
            if (pagination.order === 'popular') {
                text += `
                    <li class="main-margin">
                        <a href="${pagination.end_page + 1} popular" class="right main-user-bottom-right">
                            <svg class="main-user-bottom-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.42 20.73a1.076 1.076 0 0 1-.13-1.587L14.832 12 8.289 4.857a1.076 1.076 0 0 1 .13-1.586 1.26 1.26 0 0 1 1.696.122L18 12l-7.885 8.607a1.26 1.26 0 0 1-1.695.122Z"></path>
                            </svg>
                        </a>
                    </li>
                `
            } else {
                text += `
                    <li class="main-margin">
                        <a href="${pagination.end_page + 1}" class="right main-user-bottom-right">
                            <svg class="main-user-bottom-svg" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.42 20.73a1.076 1.076 0 0 1-.13-1.587L14.832 12 8.289 4.857a1.076 1.076 0 0 1 .13-1.586 1.26 1.26 0 0 1 1.696.122L18 12l-7.885 8.607a1.26 1.26 0 0 1-1.695.122Z"></path>
                            </svg>
                        </a>
                    </li>
                `
            }
        }

        return text;
    }

    // 위시리스트 개수 표기 텍스트
    const CountText = (pagination) => {
        let text = ``;
        text += pagination.total

        return text;
    }

    return {showList: showList, showPaging: showPaging, CountText: CountText}
})();





// ---------------------------------------------------------------------------------------------------------------------
// 위시리스트 게시글 태그
const promoteData = document.querySelector(".promote-data")
// 게시글 목록 보여주기
function allShowList() {
    adminPromoteService.getPagination(page, CreateService.showList).then((text) => {
        promoteData.innerHTML = text;
    })
}
allShowList();

// 번호 태그
const mainUserBottomUl = document.querySelector(".main-user-bottom-ul")

// 페이지 번호 보여주기
function allShowPaging() {
    adminPromoteService.getPagination(page, CreateService.showPaging).then((text) => {
        mainUserBottomUl.innerHTML = text;
    })
}
allShowPaging();

// 개수 표기 태그
const totalCount = document.getElementById("total-count");

// 공지사항 개수 표기
function CountShowText() {
    adminPromoteService.getPagination(page, CreateService.CountText).then((text) => {
        totalCount.textContent = text;
    })
}
CountShowText();





// ---------------------------------------------------------------------------------------------------------------------
// 페이지 네이션
// 페이지 번호 박스 클릭 시 이벤트 발생
mainUserBottomUl.addEventListener("click", (e) => {
    // 페이지 번호 a태그
    const mainUserBottom = document.querySelectorAll(".main-user-bottom")
    // 페이지 번호 박스 속 번호
    const endPage = document.querySelectorAll(".main-user-number")

    // 페이지 이동 막아주기
    e.preventDefault()

    // 만약, 페이지 번호 클릭 시
    if (e.target.closest(".main-user-bottom") && e.target.closest(".main-user-bottom").classList.contains('pagination')) {
        console.log("if 들어옴")

        // 기존 선택된 페이지 번호 스타일 삭제
        mainUserBottom.forEach((userBottom) => {
            userBottom.classList.remove("add-color")
        })
        endPage.forEach((userNumber) => {
            userNumber.classList.remove("add-text-color")
        })

        // 새롭게 선택된 페이지 번호 스타일 부여
        e.target.closest(".main-user-bottom").classList.add("add-color")
        e.target.closest(".main-user-bottom").querySelector(".main-user-number").classList.add("add-text-color")

        // 페이지 번호를 텍스트로 가져와 page로 담기
        page = e.target.closest(".main-user-bottom").querySelector(".main-user-number").innerText

        // 번호에 따른 게시글 목록 가져오기
        allShowList();
    // 페이지 이동 다음 버튼 클릭 시
    } else if (e.target.closest(".main-user-bottom-right")) {
        // 페이지 번호 끝(문자열로 가져오기 때문에 정수로 형변환)에서 + 1 (다음 페이지) 해주기
        page = parseInt(endPage[4].innerText) + 1

        // 페이지에 따른 목록 보여주기
        allShowList();

        // 페이지에 따른 페이지 번호 목록 보여주기
        allShowPaging();
    // 페이지 이동 이전 버튼 클릭 시
    } else if (e.target.closest(".main-user-bottom-left")) {
        // 페이지 번호 끝(문자열로 가져오기 때문에 정수로 형변환)에서 - 1 (이전 페이지) 해주기
        page = parseInt(endPage[0].innerText) - 1

        // 페이지에 따른 목록 보여주기
        allShowList();

        // 페이지에 따른 페이지 번호 목록 보여주기
        allShowPaging();
    }
})





// ---------------------------------------------------------------------------------------------------------------------
// 체크박스
const modalDeleteOpenButtons = document.querySelectorAll(".member-user-list-button");
// 전체 선택 버튼
const statusName = document.querySelector(".main-user-status-name");
// 전체 텍스트
const statusNameText = document.querySelector(".main-user-total-text")

promoteData.addEventListener('click', (e) => {
    // wishlistBox 요소 중 가까운 조상 중에서 main-user-list 요소 찾기
    // main-user-list가 있으면 옵셔널 체이닝(?.)을 사용하여 프로퍼티에 접근해 main-comment-list-checkbox를 찾기
    const checkboxes = e.target.closest(".main-user-list")?.querySelectorAll(".main-comment-list-checkbox");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const checkedItems = document.querySelectorAll(".main-comment-list-checkbox:checked");

            let checkedCount = 0;

            modalDeleteOpenButtons.forEach((deleteButton) => {
                if (checkedItems.length > 0) {
                    deleteButton.classList.remove("disabled");
                    checkedCount = checkedItems.length
                } else if (checkedItems.length === 0) {
                    deleteButton.classList.add("disabled");
                }
            })
            statusNameText.textContent = '전제 중';
            totalCount.textContent = checkedCount;
        });
    })
})





// ---------------------------------------------------------------------------------------------------------------------
// 모달 속 취소 버튼
const modalDeleteCloseButtons = document.querySelectorAll(".admin-user-modal-left-button");
// 모달 속 삭제 버튼
const modalDeleteButtons = document.querySelectorAll(".admin-user-modal-right-button");

// 상태변경
const deletemodal = document.getElementById("admin-user-modal");
const deletemodalBack = document.querySelector(".admin-delete-modal-backdrop");

let currentTargetLi;

// 삭제하기 버튼 클릭 시 이벤트 발생
modalDeleteOpenButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        const checkedItems = document.querySelectorAll(".main-comment-list-checkbox:checked");

        // 타겟의 아이디 값 가져오기
        const targetId = event.currentTarget.getAttribute("data-id");
        currentTargetLi = document.querySelector(`li[data-number="${targetId}"]`
        );

        // 모달 열기
        if (checkedItems.length > 0) {
            deletemodal.classList.remove("hidden");
            deletemodalBack.classList.remove("hidden");
        }
    });
});

// 삭제 모달 속 닫기 버튼 클릭 시 이벤트 발생
modalDeleteCloseButtons.forEach((button) => {
    button.addEventListener("click", () => {
        // 삭제 모달 비활성화
        deletemodal.classList.add("hidden");
        deletemodalBack.classList.add("hidden");
    });
});

// 모달 외부를 클릭했을 때 이벤트 처리
document.addEventListener("click", (e) => {
    modalDeleteOpenButtons.forEach((button) => {
        if (!button.contains(e.target) && !deletemodal.contains(e.target)) {
            // 클릭된 요소가 검색 버튼이 아니고 모달 창에 속하지 않으면 모달을 닫음
            deletemodal.classList.add("hidden");
            deletemodalBack.classList.add("hidden");
        }
    });
});

// 삭제 모달 속 삭제 버튼 클릭 시 이벤트 발생
modalDeleteButtons.forEach((button) => {
    button.addEventListener("click", async () => {
        // 체크된 체크 박스 가져오기
        const checkedItems = document.querySelectorAll(".main-comment-list-checkbox:checked");

        // 체크된 체크 박스 반복하여 하나씩 checkbox에 담기
        for (const checkbox of checkedItems) {
            // 체크된 checkbox와 가장 가까운 li 요소를 찾고 data-id 값을 가져오기
            const targetId = checkbox.closest("li").getAttribute("data-id");
            // data-id 속성 값이 같은 li 요소를 가져오기
            await adminPromoteService.remove({ targetId: targetId });
        }

        // 모달 닫기
        deletemodal.classList.add("hidden");
        deletemodalBack.classList.add("hidden");
        allShowList();
        allShowPaging();
        CountShowText();
    });
});





// ---------------------------------------------------------------------------------------------------------------------
// 검색
// 검색 타입(모달 열기 버튼)
const searchType = document.querySelector(".main-message-info-button-add")
// 검색 타입 이름
const seartchTypeText = document.querySelector(".main-message-info-button-text-add")

// 검색 타입 모달
const searchTypeModal = document.querySelector(".admin-message-modal-search-add")
// 검색 타입 모달 속 작성자 버튼
const searchTypePButton = document.querySelector(".admin-message-modal-search-send-add")
// 검색 타입 모달 속 위시리스트 버튼
const searchTypeWButton = document.querySelector(".admin-message-modal-search-receive-add")

// 입력창
const searchInput = document.querySelector(".main-user-info-input")

// 버튼 클릭 시 모달 활성화
searchType.addEventListener('click', () => {
    searchTypeModal.classList.remove("hidden")
})

// 모달 외부를 클릭했을 때 이벤트 처리
document.addEventListener("click", (e) => {
    if (!searchType.contains(e.target) && !searchTypeModal.contains(e.target)) {
        searchTypeModal.classList.add("hidden");
    }
});

// "작성자" 버튼 클릭 시 모달 닫고 텍스트 변경
searchTypePButton.addEventListener("click", (button) => {
    searchTypeModal.classList.add("hidden");
    seartchTypeText.textContent = "모임이름";
    type = button.value;
});

// " 제목" 버튼 클릭 시 모달 닫고 텍스트 변경
searchTypeWButton.addEventListener("click", (button) => {
    searchTypeModal.classList.add("hidden");
    seartchTypeText.textContent = "제목";
    type = button.value;
});

searchInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        const typeValue = document.querySelector(".main-message-info-button-text-add")
        if (typeValue.innerHTML === '모임이름') {
            type = 'w'
        } else if (typeValue.innerHTML === '제목') {
            type = 'p'
        }

        keyword = e.target.value

        adminPromoteService.search(page, type, keyword, CreateService.showList).then((text) => {
            promoteData.innerHTML = text;
        })
        adminPromoteService.search(page, type, keyword, CreateService.showPaging).then((text) => {
            mainUserBottomUl.innerHTML = text;
        })
        adminPromoteService.search(page, type, keyword, CreateService.CountText).then((text) => {
            totalCount.textContent = text;
        })
    }
});





// ---------------------------------------------------------------------------------------------------------------------
// 상세 보기
// 상세 추가 태그
const detailBox = document.querySelector(".detail-box")
const detailModel = document.querySelector(".admin-post-modal");
const detailModelBack = document.querySelector(".admin-user-modal-backdrop");
const detailModelTitle = document.querySelector("input[name=title]");
const detailModelContent = document.querySelector("textarea[name=content]");
const detailModelImg = document.querySelector(".admin-post-modal-thumbnail-img");
const detailModelCategory = document.querySelector("input[name=category]");
const detailBoxClosed = document.querySelector(".admin-user-modal-left-detail-button")

promoteData.addEventListener('click', (e) => {
    if (e.target.classList[0] === 'member-user-list-detail-button') {
        let targetID = e.target.getAttribute("data-id");
        detailModelTitle.value = document.getElementById(`title${targetID}`).innerText
        detailModelContent.value = document.getElementById(`post-content${targetID}`).value
        detailModelImg.src = document.getElementById(`image-path${targetID}`).value
        detailModelCategory.value = document.getElementById(`club-post-category${targetID}`).value

        detailModel.classList.remove("hidden");
        detailModelBack.classList.remove("hidden");

    }
})

detailBoxClosed.addEventListener('click', () => {
    detailModel.classList.add("hidden")
    detailModelBack.classList.add("hidden")
})
