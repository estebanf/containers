#!/bin/sh
#
#  Groovy JVM Bootstrap for UN*X
#  use -cp or -classpath just as in java to use a custom classpath
#


SCRIPT_PATH="$0"

warn ( ) {
    echo "Groovy: $*"
}

die ( ) {
    warn "$*"
    exit 1
}

# OS specific support (must be 'true' or 'false').
cygwin=false
msys=false
darwin=false
case "`uname`" in
  CYGWIN* )
    cygwin=true
    ;; 
  Darwin* )
    darwin=true
    ;;
  MINGW* )
    msys=true
    ;;
esac

if [ "$1" = "-cp" -o "$1" = "-classpath" ] ; then
    CP=$2
    shift 2
fi

# Attempt to set JAVA_HOME if it's not already set.
if [ -z "$JAVA_HOME" ] ; then
    if $darwin ; then 
        [ -z "$JAVA_HOME" -a -d "/Library/Java/Home" ] && export JAVA_HOME="/Library/Java/Home"
        [ -z "$JAVA_HOME" -a -d "/System/Library/Frameworks/JavaVM.framework/Home" ] && export JAVA_HOME="/System/Library/Frameworks/JavaVM.framework/Home"
    else
        javaExecutable="`which javac`"
        [ -z "$javaExecutable" -o "`expr \"$javaExecutable\" : '\([^ ]*\)'`" = "no" ] && die "JAVA_HOME not set and cannot find javac to deduce location, please set JAVA_HOME."
        # readlink(1) is not available as standard on Solaris 10.
        readLink=`which readlink`
        [ `expr "$readLink" : '\([^ ]*\)'` = "no" ] && die "JAVA_HOME not set and readlink not available, please set JAVA_HOME."
        javaExecutable="`readlink -f \"$javaExecutable\"`"
        javaHome="`dirname \"$javaExecutable\"`"
        javaHome=`expr "$javaHome" : '\(.*\)/bin'`
        JAVA_HOME="$javaHome"
        export JAVA_HOME

    fi
fi

# For Cygwin, ensure paths are in UNIX format before anything is touched.
if $cygwin ; then
    [ -n "$JAVACMD" ] && JAVACMD=`cygpath --unix "$JAVACMD"`
    [ -n "$JAVA_HOME" ] && JAVA_HOME=`cygpath --unix "$JAVA_HOME"`
    [ -n "$CP" ] && CP=`cygpath --path --unix "$CP"`
fi

STARTER_CLASSPATH="libs/groovy-all-1.5.6.jar:libs/ant-1.7.1.jar:libs/ant-launcher-1.8.0.jar"

# Create the final classpath. Setting a classpath using the -cp or -classpath option means not to use the
# global classpath. Groovy behaves then the same as the java interpreter
if [ -n "$CP" ] ; then
    CP="$CP":.
elif [ -n "$CLASSPATH" ] ; then
    CP="$CLASSPATH":.
else
    CP=.
fi

# Determine the Java command to use to start the JVM.
if [ -z "$JAVACMD" ] ; then
    if [ -n "$JAVA_HOME" ] ; then
        if [ -x "$JAVA_HOME/jre/sh/java" ] ; then
            # IBM's JDK on AIX uses strange locations for the executables
            JAVACMD="$JAVA_HOME/jre/sh/java"
        else
            JAVACMD="$JAVA_HOME/bin/java"
        fi
    else
        JAVACMD="java"
    fi
fi
if [ ! -x "$JAVACMD" ] ; then
    die "JAVA_HOME is not defined correctly, can not execute: $JAVACMD"
fi
if [ -z "$JAVA_HOME" ] ; then
    warn "JAVA_HOME environment variable is not set"
fi

# For Darwin, use classes.jar for TOOLS_JAR
TOOLS_JAR="$JAVA_HOME/lib/tools.jar"
#if $darwin; then
#    TOOLS_JAR="/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Classes/classes.jar"
#fi

# For Cygwin, switch paths to Windows format before running java
if $cygwin ; then
    JAVA_HOME=`cygpath --path --mixed "$JAVA_HOME"`
    CP=`cygpath --path --mixed "$CP"`    
    TOOLS_JAR=`cygpath --path --mixed "$TOOLS_JAR"`
    STARTER_CLASSPATH=`cygpath --path --mixed "$STARTER_CLASSPATH"`

    # We build the pattern for arguments to be converted via cygpath
    ROOTDIRSRAW=`find -L / -maxdepth 1 -mindepth 1 -type d 2>/dev/null`
    SEP=""
    for dir in $ROOTDIRSRAW ; do
        ROOTDIRS="$ROOTDIRS$SEP$dir"
        SEP="|"
    done
    OURCYGPATTERN="(^($ROOTDIRS))"
    # Add a user-defined pattern to the cygpath arguments
    if [ "$GROOVY_CYGPATTERN" != "" ] ; then
        OURCYGPATTERN="$OURCYGPATTERN|($GROOVY_CYGPATTERN)"
    fi
    # Now convert the arguments - kludge to limit ourselves to /bin/sh
    i=0
    for arg in "$@" ; do
        CHECK=`echo "$arg"|egrep -c "$OURCYGPATTERN" -`
        if [ $CHECK -ne 0 ] ; then
            eval `echo args$i`=`cygpath --path --ignore --mixed "$arg"`
        else
            eval `echo args$i`="\"$arg\""
        fi
        i=`expr $i + 1`
    done
    case $i in
        0) set -- ;;
        1) set -- "$args0" ;;
        2) set -- "$args0" "$args1" ;;
        3) set -- "$args0" "$args1" "$args2" ;;
        4) set -- "$args0" "$args1" "$args2" "$args3" ;;
        5) set -- "$args0" "$args1" "$args2" "$args3" "$args4" ;;
        6) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" ;;
        7) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" "$args6" ;;
        8) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" "$args6" "$args7" ;;
        9) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" "$args6" "$args7" "$args8" ;;
    esac

fi

exec "$JAVACMD" $JAVA_OPTS \
    -classpath "$STARTER_CLASSPATH:$CP" \
    -Dscript.name="$SCRIPT_PATH" \
    -Dprogram.name=groovy \
    -Dtools.jar="$TOOLS_JAR" \
    groovy.ui.GroovyMain \
    "$@"

