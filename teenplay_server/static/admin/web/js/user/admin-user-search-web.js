const memberSearch = document.getElementById("member-search");
const memberSearchCansle = document.getElementById("member-search-cansle");
const memberButton = document.getElementById("member-button");

// 검색어가 있으면 검색 아이콘 x로 변경
memberSearch.addEventListener("input", function () {
    if (memberSearch.value.trim() !== "") {
        memberSearchCansle.setAttribute(
            "d",
            "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3.636-13.636a.9.9 0 0 1 0 1.272L13.273 12l2.363 2.364a.9.9 0 1 1-1.273 1.272L12 13.273l-2.364 2.363a.9.9 0 0 1-1.273-1.272L10.727 12 8.363 9.636a.9.9 0 0 1 1.273-1.272L12 10.727l2.363-2.363a.9.9 0 0 1 1.273 0Z"
        );
        memberSearchCansle.setAttribute("fill", "#CCCCCD");
        memberSearchCansle.setAttribute("color", "#CCCCCD");
    // 검색어가 없으면 원래대로 복구
    } else {
        memberSearchCansle.setAttribute(
            "d",
            "M15.83 16.561a7.8 7.8 0 1 1 1.233-1.312l3.465 3.465a.9.9 0 1 1-1.272 1.273L15.83 16.56Zm1.13-5.961a6.16 6.16 0 1 1-12.32 0 6.16 6.16 0 0 1 12.32 0Z"
        );
        memberSearchCansle.setAttribute("fill", "#1d1d1e");
        memberSearchCansle.setAttribute("color", "#1d1d1e");
    }
});

// 취소 버튼 클릭 시 검색창 값 비워지기
memberButton.addEventListener("click", (e) => {
    memberSearch.value = "";
    memberSearchCansle.setAttribute(
        "d",
        "M15.83 16.561a7.8 7.8 0 1 1 1.233-1.312l3.465 3.465a.9.9 0 1 1-1.272 1.273L15.83 16.56Zm1.13-5.961a6.16 6.16 0 1 1-12.32 0 6.16 6.16 0 0 1 12.32 0Z"
    );
    memberSearchCansle.setAttribute("fill", "#1d1d1e");
    memberSearchCansle.setAttribute("color", "#1d1d1e");
});

// 검색기능

document
    .getElementById("member-search")
    .addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
            var searchTerm = document
                .getElementById("member-search")
                .value.trim()
                .toLowerCase();
            var userList = document.querySelectorAll(".main-user-list");
            var noResultsMsg = document.getElementById("no-results-msg");

            var foundResults = false;

            for (var i = 0; i < userList.length; i++) {
                var userName = userList[i]
                    .querySelector(".main-user-list-name")
                    .textContent.trim()
                    .toLowerCase();
                if (!userName.includes(searchTerm)) {
                    userList[i].classList.add("hide");
                    document.getElementById("member-search").value = "";
                } else {
                    userList[i].classList.remove("hide");
                    foundResults = true;
                    document.getElementById("member-search").value = "";
                }
            }

            if (!foundResults) {
                noResultsMsg.classList.remove("hide");
                document.getElementById("member-search").value = "";
            } else {
                noResultsMsg.classList.add("hide");
                document.getElementById("member-search").value = "";
            }

            // 입력 필드를 비웁니다.
        }
    });
