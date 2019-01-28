/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('has rss defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('has url defined', function() { // #4 in README
            // Have to use 'forEach' because 'For...of' is not read 
            // by most browsers so Jasmine did not work properly
            allFeeds.forEach(function(feed){ 
                expect(feed.url).toBeDefined(); // Sees if url is defined in allFeeds
                expect(feed.url.length).toBeGreaterThan(0);
            });
                                    
        });

        /* Done: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        // Same as above for url, but for name
        it('has name defined', function(){ // #5 in README
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
                expect(feed.name.length).toBeGreaterThan(0); 
            });
        });
    });
    /* Done: Write a new test suite named "The menu" */
    describe('the menu visability', function() { // #6 in README
       /* Done: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function() { // #7 in README
            expect($('body').hasClass('menu-hidden')).toBe(true); 
            // ref: https://devhints.io/jasmine            
        });
        /* Done: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('shows/hides when toggled', function(){ // #8 in README
            /*Because code runs down, it will check each line 
            compared with the last, to see if the button has been clicked
            and if it is false, if not then again if it is true.*/
            $('a.menu-icon-link').click(); // when clicked
            expect($('body').hasClass('menu-hidden')).toBe(false); // menu is not hidden
            $('a.menu-icon-link').click(); // when clicked again
            expect($('body').hasClass('menu-hidden')).toBe(true); // menu is hidden
            // ref: https://devhints.io/jasmine
            // ref: https://api.jquery.com/click/ 
        }); 

    });
        
    /* Done: Write a new test suite named "Initial Entries" */
    describe('the initial entries', function () { // #9 in README

        /* Done: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done){ // # 10 in README
            loadFeed(0,done);
        });
        it('is greater than 0', function () {
           expect($('.feed .entry').length).toBeGreaterThan(0); 
        });

    });

    /* Done: Write a new test suite named "New Feed Selection" */
    describe('new feed selection', function(){ // # 11 in README
        /* Done: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var previousFeed;

        beforeEach(function(done){
            loadFeed(0,function(){
                previousFeed = $('.feed').html();
                loadFeed(1,done);
            });
        });

        it('is not the same', function(){ // # 12 in README
            expect($('.feed').html()).not.toBe(previousFeed);
        });
    });
}());
