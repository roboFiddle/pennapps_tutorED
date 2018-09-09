var app = angular.module('StarterApp', ['ngMaterial', 'ngMdIcons', 'ngSanitize']);

app.controller('AppCtrl', ['$scope', '$mdBottomSheet','$mdSidenav', '$mdDialog', function($scope, $mdBottomSheet, $mdSidenav, $mdDialog) {
    $scope.pageToShow = 0;
    $scope.pageNames = {
        0: "Dashboard",
        1: "Tutoring Offers/Requests",
        2: "Request Tutoring",
        3: "Profile",
        5: "Q/A Forum"
    };
    $scope.toggleSidenav = function (menuId) {
        $mdSidenav(menuId).toggle();
    };
    $scope.logout = function (event) {
        alert("Logged Out");
    }
    $scope.appointments = [
        {
            who: 'Laura, Kate, David, Sam, and Chris',
            when: 'Saturday 09/15/18 at 2:00pm',
            notes: 'SAT Practice Session at High School'
        },
        {
            who: 'Roger Chambers',
            when: 'Saturday 09/15/18 at 4:00pm',
            notes: 'Physics Review Session at Millburn Library'
        },
        {
            who: 'Sarah Taylor',
            when: 'Sunday 09/16/18 at 4:00pm',
            notes: 'Programming at Taylor House (11 Main Street)'
        }
    ]
    $scope.messages = [
        {
            when: '12 min ago',
            who: 'Ali Conners',
            notes: "I have this physics test on Friday, can we schedule a session to review the material."
        },
        {
            when: '30 min ago',
            who: 'Alex McKinley',
            notes: "I can't come to the session on Thursday, can we reschedule?"
        },
        {
            when: '90 min ago',
            who: 'Trevor Hansen',
            notes: "I think I'm going to have a pop english essay on Baywolf, can we call to talk about it."
        },
        {
            when: '2 hrs ago',
            who: 'Sandra Adams',
            notes: "You: I just want to confirm that we're going over your practice SAT test on Saturday."
        },
        {
            when: '1 day ago',
            who: 'Brian Holt',
            notes: "You: Hi, I hope you had a great holiday weekend. Do you know how often you're going to want to have tutoring sessions."
        }
    ];
    $scope.forumposts = [
        {
            who: 'James Brunner',
            title: 'How do Complex Numbers Work?',
            text: 'I dont understand how a number was just made and definded to be something that ist\'t logical. Can someone explain why these numbers work?',
            class: 4
        },
        {
            who: 'Alex McKinley',
            title: 'Confused about question on Practice Test',
            text: 'I saw a question on the practice test in class today, it was something like y=3sin(x+5) and we needed to solve for x in terms of y.',
            class: 5
        }
    ];
    $scope.offers = [
        {class: "Algebra I", dates:"Monday, Tuesday, Thursday"},
        {class: "Algebra II", dates:"Monday, Tuesday, Friday"},
        {class: "Geometry", dates:"Wednesday, Thursday"}
    ]
    $scope.requests = [
        {class: "US History I", dates:"Monday, Tuesday, Thursday"},
        {class: "American Literature", dates:"Monday, Tuesday, Friday"},
    ];
    $scope.checkIfIn = function(id, isR) {
        var n = $scope.classes[id].name;
        var r = 0;
        if(isR == 0)
        {
            for(var i=0; i<$scope.offers.length; i++){
                if($scope.offers[i].class == n)
                    r=1;
            }
        }
        else
        {
            for(var i=0; i<$scope.requests.length; i++){
                if($scope.requests[i].class == n)
                    r=1;
            }
        }
        return r;
    };
    $scope.alert = '';
    $scope.showListBottomSheet = function ($event) {
        $scope.alert = '';
        $mdBottomSheet.show({
            template: '<md-bottom-sheet class="md-list md-has-header"> <md-subheader>Settings</md-subheader> <md-list> <md-item ng-repeat="item in items"><md-item-content md-ink-ripple flex> <div class="inset"> <ng-md-icon icon="{{item.icon}}"></ng-md-icon> </div> <div class="inset"> <a flex aria-label="{{item.name}}" ng-click="listItemClick($index)"> <span class="md-inline-list-icon-label">{{ item.name }}</span> </a></md-item-content> </md-item> </md-list></md-bottom-sheet>',
            controller: 'ListBottomSheetCtrl',
            targetEvent: $event
        }).then(function (clickedItem) {
            $scope.alert = clickedItem.name + ' clicked!';
        });
    };
    $scope.showAdd = function (ev) {
        $mdDialog.show({
            controller: DialogController,
            template: '<md-dialog aria-label="Mango (Fruit)"> <md-content class="md-padding"> <form name="userForm"> <div layout layout-sm="column"> <md-input-container flex> <label>First Name</label> <input ng-model="user.firstName" placeholder="Placeholder text"> </md-input-container> <md-input-container flex> <label>Last Name</label> <input ng-model="theMax"> </md-input-container> </div> <md-input-container flex> <label>Address</label> <input ng-model="user.address"> </md-input-container> <div layout layout-sm="column"> <md-input-container flex> <label>City</label> <input ng-model="user.city"> </md-input-container> <md-input-container flex> <label>State</label> <input ng-model="user.state"> </md-input-container> <md-input-container flex> <label>Postal Code</label> <input ng-model="user.postalCode"> </md-input-container> </div> <md-input-container flex> <label>Biography</label> <textarea ng-model="user.biography" columns="1" md-maxlength="150"></textarea> </md-input-container> </form> </md-content> <div class="md-actions" layout="row"> <span flex></span> <md-button ng-click="answer(\'not useful\')"> Cancel </md-button> <md-button ng-click="answer(\'useful\')" class="md-primary"> Save </md-button> </div></md-dialog>',
            targetEvent: ev,
        })
            .then(function (answer) {
                $scope.alert = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.alert = 'You cancelled the dialog.';
            });
    };
    $scope.user = {
        email: '20weissa@millburn.org',
        firstName: 'Alexander',
        lastName: 'Weiss',
        grade: 3,
        password: 'password',
        bio: '',
        changePass: ['', '', ''],
    };
    $scope.grades = [
        {id: 0, name: 'Middle School'},
        {id: 1, name: 'HS Freshman'},
        {id: 2, name: 'HS Sophomore'},
        {id: 3, name: 'HS Junior'},
        {id: 4, name: 'HS Senior'},
        {id: 5, name: 'College'}
    ];
    $scope.categories = [
        {id:0, name:"Math"},
        {id:1, name:"English"},
        {id:2, name:"History"},
        {id:3, name:"World Language"},
        {id:4, name:"Science"},
    ]

    $scope.classes = [
        {id: 0, category: null, name: "Set Category to Select Class"},
        {id: 1, category: 0, name: 'Pre-Algebra'},
        {id: 2, category: 0, name: 'Algreba I'},
        {id: 3, category: 0, name: 'Geometry'},
        {id: 4, category: 0, name: 'Algebra II'},
        {id: 5, category: 0, name: 'Pre-Calculus'},
        {id: 6, category: 0, name: 'Calculus'},
        {id: 7, category: 1, name: 'English 9'},
        {id: 8, category: 1, name: 'American Literature'},
        {id: 9, category: 1, name: 'British Literature'},
        {id: 10, category: 1, name: 'AP Language + Composition'},
        {id: 11, category: 1, name: 'AP Literature + Composition'},
        {id: 12, category: 1, name: 'Senior Seminar'},
        {id: 13, category: 2, name: 'World History'},
        {id: 14, category: 2, name: 'US History I'},
        {id: 15, category: 2, name: 'US History II'},
        {id: 16, category: 2, name: 'AP American History'},
        {id: 17, category: 2, name: 'Economics'},
        {id: 18, category: 3, name: 'Spanish 1/2'},
        {id: 19, category: 3, name: 'Spanish 3/4'},
        {id: 20, category: 3, name: 'AP Spanish'},
        {id: 21, category: 3, name: 'Spanish Electives'},
        {id: 22, category: 3, name: 'French 1/2'},
        {id: 23, category: 3, name: 'French 3/4'},
        {id: 24, category: 3, name: 'AP French'},
        {id: 25, category: 3, name: 'French Electives'},
        {id: 26, category: 4, name: 'Integrated Geophysics'},
        {id: 27, category: 4, name: 'Biology ACC/CPA/CPB'},
        {id: 28, category: 4, name: 'Biology AP'},
        {id: 29, category: 4, name: 'Chemistry ACC/CPA/CPB'},
        {id: 30, category: 4, name: 'Chemistry AP'},
        {id: 31, category: 4, name: 'Physics ACC/CPA/CPB'},
        {id: 32, category: 4, name: 'Physics AP'},
    ];

    $scope.days = [
        {id: 0, name: "Monday"},
        {id: 1, name: "Tuesday"},
        {id: 2, name: "Wednesday"},
        {id: 3, name: "Thursday"},
        {id: 4, name: "Friday"},
        {id: 5, name: "Saturday"},
        {id: 6, name: "Sunday"}
    ];

    $scope.selectedFilters = [
        0,0,0,0,0,
        0,0,0,0,0,0,
        0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0
    ];

    $scope.openRespondMessage = function(ev, id) {
        console.log($scope.messages[id].who);
        n = $scope.messages[id].who;
        p = "Your Response to " + n;
            // Appending dialog to document.body to cover sidenav in docs app
            var confirm = $mdDialog.prompt()
                .title(p)
                .placeholder('Response')
                .ariaLabel('Dog name')
                .initialValue('')
                .targetEvent(ev)
                .required(true)
                .ok('Send')
                .cancel('Cancel');

            $mdDialog.show(confirm).then(function(result) {
                var message = $scope.messages[id];
                $scope.messages.splice(id, 1);
                message.notes = "You: " + result;
                message.when = 'Just now';
                $scope.messages.unshift(message);
            }, function() {
                $scope.status = 'You didn\'t name your dog.';
            });
    };

    $scope.openForumResponse = function(ev, id) {
        n = $scope.forumposts[id].who;
        p = "Your Response to " + n + "'s Question";
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.prompt()
            .title(p)
            .placeholder('Response')
            .ariaLabel('Dog name')
            .htmlContent('Their Title: ' +  $scope.forumposts[id].title + '<br>Their Post: ' +  $scope.forumposts[id].text)
            .initialValue('')
            .targetEvent(ev)
            .required(true)
            .ok('Send')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            $scope.status = 'You decided to name your dog ' + result + '.';
        }, function() {
            $scope.status = 'You didn\'t name your dog.';
        });
    };
    $scope.selectedDays = [];
    $scope.selectedCategory = null;
    $scope.selectedClass = null;



    $scope.status = '  ';
    $scope.customFullscreen = false;
    $scope.deleteOffer = function(ev,i) {
        var confirm = $mdDialog.confirm()
            .title('Confirm your Deletion')
            .textContent('Are you sure you want to delete your offer for ' + $scope.offers[i].class + " on " + $scope.offers[i].dates)
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $scope.offers.splice(i,1);
        }, function() {
        });

    };
    $scope.deleteRequest = function(ev,i) {
        var confirm = $mdDialog.confirm()
            .title('Confirm your Deletion')
            .textContent('Are you sure you want to delete your request for ' + $scope.requests[i].class + " on " + $scope.requests[i].dates)
            .targetEvent(ev)
            .ok('Yes')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function() {
            $scope.requests.splice(i,1);
        }, function() {
        });
    }

    $scope.addOfferDialog = function(ev) {
        $scope.selectedDays = [];
        $scope.selectedCategory = null;
        $scope.selectedClass = null;
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            controller: AddClassDialogController,
            templateUrl: 'dialogs/addclass.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            console.log($scope.selectedClass);
            console.log($scope.selectedDays.length);
            if($scope.selectedDays.length != 0) {
                var daystring = '';
                for(var i = 0; i < $scope.selectedDays.length; i++) {
                    console.log($scope.selectedDays[i]);
                    console.log($scope.days[$scope.selectedDays[i]]);
                    daystring += $scope.days[$scope.selectedDays[i]].name;
                    daystring += ", ";
                    console.log(daystring);
                }
                daystring = daystring.substring(0, daystring.length - 2);
                console.log(daystring);
                $scope.offers.push({dates: daystring, class: $scope.classes[$scope.selectedClass].name});
            }
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.addRequestDialog = function(ev) {
        $scope.selectedDays = [];
        $scope.selectedCategory = null;
        $scope.selectedClass = null;
        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            controller: AddClassDialogController,
            templateUrl: 'dialogs/addclass.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            console.log($scope.selectedClass);
            console.log($scope.selectedDays.length);
            if($scope.selectedDays.length != 0) {
                var daystring = '';
                for(var i = 0; i < $scope.selectedDays.length; i++) {
                    console.log($scope.selectedDays[i]);
                    console.log($scope.days[$scope.selectedDays[i]]);
                    daystring += $scope.days[$scope.selectedDays[i]].name;
                    daystring += ", ";
                    console.log(daystring);
                }
                daystring = daystring.substring(0, daystring.length - 2);
                console.log(daystring);
                $scope.requests.push({dates: daystring, class: $scope.classes[$scope.selectedClass].name});
            }
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };
    $scope.openForumFilter = function(ev) {

        // Appending dialog to document.body to cover sidenav in docs app
        // Modal dialogs should fully cover application
        // to prevent interaction outside of dialog
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            controller: AddClassDialogController,
            templateUrl: 'dialogs/filter.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    $scope.changePasswordDialog = function(ev) {
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            controller: ChangePasswordDialogController,
            templateUrl: 'dialogs/changepass.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            if(answer==1)
                alert("Process Change Password")
        }, function() {
            alert('You cancelled the dialog.');
        });
    };
    $scope.qText = null;
    $scope.qQuestion = null;
    $scope.postInForumDialog = function(ev) {
        $scope.selectedCategory = null;
        $scope.selectedClass = null;
        $scope.qText = null;
        $scope.qQuestion = null;
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            controller: AddClassDialogController,
            templateUrl: 'dialogs/postforum.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
            if(answer == 0)
                return;
            var post = {};
            post['who'] = $scope.user.firstName + " " + $scope.user.lastName;
            post['title'] = $scope.qQuestion
            post['text'] = $scope.qText;
            post['class'] = $scope.selectedClass;
            $scope.forumposts.unshift(post);
        }, function() {
        });
    };
    $scope.availableTutors = [
        {
            name: "Marty Ross",
            bio: "Post no so what deal evil rent by real in. ",
            grade: 2
        },
        {
            name: "Shania Matthews",
            bio: "Him rendered may attended concerns jennings reserved now. ",
            grade: 4
        },
        {
            name: "Nathaniel Reeve",
            bio: "If we landlord stanhill mr whatever pleasure supplied concerns so.",
            grade: 3
        },
        {
            name: "Eddison Humphreys",
            bio: "She offices for highest and replied one venture pasture. Applauded no discovery in newspaper allowance am northward. ",
            grade: 3
        },
        {
            name: "Leonard Richmond",
            bio: "Remainder northward performed out for moonlight. Yet late add name was rent park from rich. ",
            grade: 4
        },
    ];
    $scope.openSendDialog = function(ev, name) {
        console.log("yayayayay");
        var confirm = $mdDialog.prompt()
            .title("Your Message to " + name)
            .placeholder('Response')
            .initialValue('')
            .targetEvent(ev)
            .required(true)
            .ok('Send')
            .cancel('Cancel');

        $mdDialog.show(confirm).then(function(result) {
            var message = {}
            message.notes = "You: " + result;
            message.when = 'Just now';
            message.who = name;
            $scope.messages.unshift(message);
        }, function() {
            $scope.status = 'You didn\'t name your dog.';
        });
    };
    $scope.searchForTutorDialog = function(ev, id) {
        $mdDialog.show({
            scope: $scope,
            preserveScope: true,
            templateUrl: 'dialogs/tutorsearch.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose:true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        }).then(function(answer) {
        }, function() {
        });
    };
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
}]);

app.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
    $scope.items = [
        { name: 'Share', icon: 'share' },
        { name: 'Upload', icon: 'upload' },
        { name: 'Copy', icon: 'copy' },
        { name: 'Print this page', icon: 'print' },
    ];

    $scope.listItemClick = function($index) {
        var clickedItem = $scope.items[$index];
        $mdBottomSheet.hide(clickedItem);
    };
});

function ChangePasswordDialogController($scope, $mdDialog) {
    $scope.classes = $scope.$parent.classes;
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        $mdDialog.hide(answer);
    };
};

function AddClassDialogController($scope, $mdDialog) {


};

app.directive('userAvatar', function() {
    return {
        replace: true,
        template: '<svg class="user-avatar" viewBox="0 0 128 128" height="64" width="64" pointer-events="none" display="block" > <path fill="#FF8A80" d="M0 0h128v128H0z"/> <path fill="#FFE0B2" d="M36.3 94.8c6.4 7.3 16.2 12.1 27.3 12.4 10.7-.3 20.3-4.7 26.7-11.6l.2.1c-17-13.3-12.9-23.4-8.5-28.6 1.3-1.2 2.8-2.5 4.4-3.9l13.1-11c1.5-1.2 2.6-3 2.9-5.1.6-4.4-2.5-8.4-6.9-9.1-1.5-.2-3 0-4.3.6-.3-1.3-.4-2.7-1.6-3.5-1.4-.9-2.8-1.7-4.2-2.5-7.1-3.9-14.9-6.6-23-7.9-5.4-.9-11-1.2-16.1.7-3.3 1.2-6.1 3.2-8.7 5.6-1.3 1.2-2.5 2.4-3.7 3.7l-1.8 1.9c-.3.3-.5.6-.8.8-.1.1-.2 0-.4.2.1.2.1.5.1.6-1-.3-2.1-.4-3.2-.2-4.4.6-7.5 4.7-6.9 9.1.3 2.1 1.3 3.8 2.8 5.1l11 9.3c1.8 1.5 3.3 3.8 4.6 5.7 1.5 2.3 2.8 4.9 3.5 7.6 1.7 6.8-.8 13.4-5.4 18.4-.5.6-1.1 1-1.4 1.7-.2.6-.4 1.3-.6 2-.4 1.5-.5 3.1-.3 4.6.4 3.1 1.8 6.1 4.1 8.2 3.3 3 8 4 12.4 4.5 5.2.6 10.5.7 15.7.2 4.5-.4 9.1-1.2 13-3.4 5.6-3.1 9.6-8.9 10.5-15.2M76.4 46c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6zm-25.7 0c.9 0 1.6.7 1.6 1.6 0 .9-.7 1.6-1.6 1.6-.9 0-1.6-.7-1.6-1.6-.1-.9.7-1.6 1.6-1.6z"/> <path fill="#E0F7FA" d="M105.3 106.1c-.9-1.3-1.3-1.9-1.3-1.9l-.2-.3c-.6-.9-1.2-1.7-1.9-2.4-3.2-3.5-7.3-5.4-11.4-5.7 0 0 .1 0 .1.1l-.2-.1c-6.4 6.9-16 11.3-26.7 11.6-11.2-.3-21.1-5.1-27.5-12.6-.1.2-.2.4-.2.5-3.1.9-6 2.7-8.4 5.4l-.2.2s-.5.6-1.5 1.7c-.9 1.1-2.2 2.6-3.7 4.5-3.1 3.9-7.2 9.5-11.7 16.6-.9 1.4-1.7 2.8-2.6 4.3h109.6c-3.4-7.1-6.5-12.8-8.9-16.9-1.5-2.2-2.6-3.8-3.3-5z"/> <circle fill="#444" cx="76.3" cy="47.5" r="2"/> <circle fill="#444" cx="50.7" cy="47.6" r="2"/> <path fill="#444" d="M48.1 27.4c4.5 5.9 15.5 12.1 42.4 8.4-2.2-6.9-6.8-12.6-12.6-16.4C95.1 20.9 92 10 92 10c-1.4 5.5-11.1 4.4-11.1 4.4H62.1c-1.7-.1-3.4 0-5.2.3-12.8 1.8-22.6 11.1-25.7 22.9 10.6-1.9 15.3-7.6 16.9-10.2z"/> </svg>'
    };
});

app.config(function($mdThemingProvider) {
    var customBlueMap = 		$mdThemingProvider.extendPalette('light-blue', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey');
    $mdThemingProvider.theme('docs-dark', 'default')
        .primaryPalette('yellow')
        .dark();
});
