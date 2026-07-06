const fs = require('fs');

const mdxFiles = [
    'lib/data/docs/content/trial-experience.mdx',
    'lib/data/docs/content/user-guide.mdx'
];

const replacements = [
    {
        find: `    <li>In Fabric, navigate to <strong class="font-semibold text-docs-text-primary">Settings</strong> > <strong class="font-semibold text-docs-text-primary">Admin Portal</strong>.</li>`,
        replace: `    <li>\n        <p>In Fabric, navigate to <strong class="font-semibold text-docs-text-primary">Settings</strong> > <strong class="font-semibold text-docs-text-primary">Admin Portal</strong>.</p>\n    </li>`
    },
    {
        find: `    <li>Ensure the setting is enabled (or contact your tenant admin to enable it).\n        <p class="mt-2"><img src="/images/extracted/img_db707126.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>Ensure the setting is enabled (or contact your tenant admin to enable it).</p>\n        <p class="mt-2"><img src="/images/extracted/img_db707126.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        Go to the <strong class="font-semibold text-docs-text-primary">Workload Hub</strong> (you can find it in the Fabric navigation menu).\n        <p class="mt-2"><img src="/images/extracted/img_63510573.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>Go to the <strong class="font-semibold text-docs-text-primary">Workload Hub</strong> (you can find it in the Fabric navigation menu).</p>\n        <p class="mt-2"><img src="/images/extracted/img_63510573.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        Search for <strong class="font-semibold text-docs-text-primary">“Klarity360”</strong>\n        <p class="mt-2"><img src="/images/extracted/img_0f22933d.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>Search for <strong class="font-semibold text-docs-text-primary">“Klarity360”</strong></p>\n        <p class="mt-2"><img src="/images/extracted/img_0f22933d.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        Click <strong class="font-semibold text-docs-text-primary">Learn More</strong> to install the workload. You can add it either to a specific <strong class="font-semibold text-docs-text-primary">capacity</strong> or directly to a <strong class="font-semibold text-docs-text-primary">workspace</strong> where you intend to use it.\n        <p class="mt-2"><img src="/images/extracted/img_f6544d8c.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>Click <strong class="font-semibold text-docs-text-primary">Learn More</strong> to install the workload. You can add it either to a specific <strong class="font-semibold text-docs-text-primary">capacity</strong> or directly to a <strong class="font-semibold text-docs-text-primary">workspace</strong> where you intend to use it.</p>\n        <p class="mt-2"><img src="/images/extracted/img_f6544d8c.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        Click on <strong class="font-semibold text-docs-text-primary">Add.</strong>\n        <p class="mt-2"><img src="/images/extracted/img_5854f9ff.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>Click on <strong class="font-semibold text-docs-text-primary">Add.</strong></p>\n        <p class="mt-2"><img src="/images/extracted/img_5854f9ff.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        Inside KLARITY360’s workload UI, users will see a “<strong class="font-semibold text-docs-text-primary">Try Now</strong>” or “<strong class="font-semibold text-docs-text-primary">Start Trial</strong>” button in the toolbar.\n        <ul class="list-disc pl-6 space-y-1 mt-2">\n            <li>This is implemented using a Ribbon action that follows the Microsoft Fabric trial pattern.</li>\n        </ul>\n        <p class="mt-2"><img src="/images/extracted/img_de4cd0df.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>Inside KLARITY360’s workload UI, users will see a “<strong class="font-semibold text-docs-text-primary">Try Now</strong>” or “<strong class="font-semibold text-docs-text-primary">Start Trial</strong>” button in the toolbar.</p>\n        <ul class="list-disc pl-6 space-y-1 mt-2">\n            <li>This is implemented using a Ribbon action that follows the Microsoft Fabric trial pattern.</li>\n        </ul>\n        <p class="mt-2"><img src="/images/extracted/img_de4cd0df.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        The trial is activated in the backend.\n    </li>`,
        replace: `    <li>\n        <p>The trial is activated in the backend.</p>\n    </li>`
    },
    {
        find: `    <li>\n        The user sees KLARITY360’s main interface.\n        <p class="mt-2"><img src="/images/extracted/img_66b8e020.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>The user sees KLARITY360’s main interface.</p>\n        <p class="mt-2"><img src="/images/extracted/img_66b8e020.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        The UI displays a trial banner indicating the remaining trial expiration date.\n        <p class="mt-2"><img src="/images/extracted/img_4cfad9a9.png" alt=""></p>\n    </li>`,
        replace: `    <li>\n        <p>The UI displays a trial banner indicating the remaining trial expiration date.</p>\n        <p class="mt-2"><img src="/images/extracted/img_4cfad9a9.png" alt=""></p>\n    </li>`
    },
    {
        find: `    <li>\n        Click on “select your Lakehouse” and you will get the list of Lakehouses available.\n    </li>`,
        replace: `    <li>\n        <p>Click on “select your Lakehouse” and you will get the list of Lakehouses available.</p>\n    </li>`
    },
    {
        find: `    <li>\n        Select the desired Lakehouse and Click on “Choose”\n    </li>`,
        replace: `    <li>\n        <p>Select the desired Lakehouse and Click on “Choose”</p>\n    </li>`
    }
];

for (const file of [...mdxFiles, 'LIST_FORMATTING_GUIDE.md']) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Normalize CRLF to LF
    content = content.replace(/\r\n/g, '\n');
    
    for (const repl of replacements) {
        if (!content.includes(repl.find)) {
            console.log("Could not find:", JSON.stringify(repl.find));
        }
        content = content.replace(repl.find, repl.replace);
    }
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed ' + file);
}
